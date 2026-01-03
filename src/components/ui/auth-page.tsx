'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Workflow, ChevronLeft, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface AuthPageProps {
	children: React.ReactNode;
	mode?: 'login' | 'signup';
	title?: string;
	subtitle?: string;
	testimonial?: {
		quote: string;
		author: string;
	};
	features?: Array<{
		title: string;
		description: string;
	}>;
	showBackButton?: boolean;
}

export function AuthPage({
	children,
	mode = 'login',
	title,
	subtitle,
	testimonial,
	features,
	showBackButton = false,
}: AuthPageProps) {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);
	const defaultTitle = mode === 'login' ? 'Welcome back' : 'Create Account';
	const defaultSubtitle =
		mode === 'login'
			? 'Sign in to continue'
			: 'Register to get started';

	const defaultTestimonial = {
		quote: 'Streamlined workflow for modern teams.',
		author: '~ HR Manager',
	};

	const defaultFeatures =
		mode === 'login'
			? [
					{ title: 'Modular HR' },
					{ title: 'Access control' },
					{ title: 'Scalable' },
				]
			: [
					{ title: 'Quick setup' },
					{ title: 'Secure access' },
					{ title: 'Enterprise ready' },
				];

	return (
		<main className="relative h-screen overflow-hidden lg:grid lg:grid-cols-2">
			{/* Left side - Branding with Floating Paths */}
			<div className="bg-muted/60 relative hidden h-full flex-col border-r p-10 lg:flex items-center justify-center">
				<div className="from-background absolute inset-0 z-10 bg-gradient-to-t to-transparent" />
				<div className="z-10 w-full max-w-md space-y-8 text-center">
					{/* Logo and Heading */}
					<div className="flex items-center justify-center gap-4">
						<div className="relative">
							<div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl"></div>
							<div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-2xl shadow-primary/25">
								<Workflow className="h-8 w-8 text-primary-foreground" strokeWidth={2.5} />
							</div>
						</div>
						<h1 className="text-5xl font-bold text-foreground tracking-tight">WorkSphere</h1>
					</div>

					{/* Testimonial */}
					<blockquote className="space-y-4">
						<p className="text-2xl font-medium text-foreground leading-relaxed whitespace-nowrap">
							&ldquo;{(testimonial || defaultTestimonial).quote}&rdquo;
						</p>
						<footer className="text-base text-muted-foreground">
							{(testimonial || defaultTestimonial).author}
						</footer>
					</blockquote>

					{/* Features */}
					{(features || defaultFeatures).length > 0 && (
						<div className="space-y-4 pt-4">
							{(features || defaultFeatures).map((feature, index) => (
								<div key={index} className="flex items-center justify-center gap-3 group">
									<div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 shadow-lg shadow-primary/50 group-hover:scale-125 transition-transform" />
									<p className="text-lg font-medium text-foreground/90">
										{feature.title}
									</p>
								</div>
							))}
						</div>
					)}
				</div>
				<div className="absolute inset-0">
					<FloatingPaths position={1} />
					<FloatingPaths position={-1} />
				</div>
			</div>

			{/* Right side - Form */}
			<div className="relative flex h-screen flex-col justify-center p-4 overflow-y-auto">
				{/* Background decorative elements */}
				<div
					aria-hidden
					className="absolute inset-0 isolate contain-strict -z-10 opacity-60"
				>
					<div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsl(var(--foreground)_/_0.06)_0,hsl(var(--foreground)_/_0.02)_50%,hsl(var(--foreground)_/_0.01)_80%)] absolute top-0 right-0 h-80 w-80 -translate-y-1/2 translate-x-1/4 rounded-full" />
					<div className="bg-[radial-gradient(50%_50%_at_50%_50%,hsl(var(--foreground)_/_0.04)_0,hsl(var(--foreground)_/_0.01)_80%,transparent_100%)] absolute top-0 right-0 h-80 w-60 translate-x-1/4 -translate-y-1/2 rounded-full" />
					<div className="bg-[radial-gradient(50%_50%_at_50%_50%,hsl(var(--foreground)_/_0.04)_0,hsl(var(--foreground)_/_0.01)_80%,transparent_100%)] absolute top-0 right-0 h-80 w-60 -translate-y-1/2 translate-x-1/4 rounded-full" />
				</div>

				{/* Theme Toggle */}
				<div className="absolute top-4 right-4 z-20">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
						className="h-9 w-9"
					>
						{mounted && theme === 'dark' ? (
							<Sun className="h-4 w-4" />
						) : (
							<Moon className="h-4 w-4" />
						)}
						<span className="sr-only">Toggle theme</span>
					</Button>
				</div>

				{showBackButton && (
					<Button variant="ghost" className="absolute top-4 left-5 z-20" asChild>
						<Link to="/">
							<ChevronLeft className="size-4 me-2" />
							Home
						</Link>
					</Button>
				)}

				<div className="mx-auto space-y-3 sm:w-sm w-full max-w-md py-4">
					{/* Mobile logo */}
					<div className="flex items-center gap-2 lg:hidden justify-center mb-6">
						<div className="relative">
							<div className="absolute inset-0 bg-primary/20 rounded-xl blur-md"></div>
							<div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
								<Workflow className="h-6 w-6 text-primary-foreground" strokeWidth={2.5} />
							</div>
						</div>
						<p className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
							WorkSphere
						</p>
					</div>

					{/* Title and subtitle */}
					<div className="flex flex-col space-y-1 text-center mb-2">
						<h1 className="font-heading text-2xl font-bold tracking-tight">
							{title || defaultTitle}
						</h1>
						<p className="text-muted-foreground text-sm">
							{subtitle || defaultSubtitle}
						</p>
					</div>

					{/* Form content (passed as children) */}
					{children}
				</div>
			</div>
		</main>
	);
}

function FloatingPaths({ position }: { position: number }) {
	const paths = Array.from({ length: 36 }, (_, i) => ({
		id: i,
		d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
			380 - i * 5 * position
		} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
			152 - i * 5 * position
		} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
			684 - i * 5 * position
		} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
		color: `rgba(15,23,42,${0.1 + i * 0.03})`,
		width: 0.5 + i * 0.03,
	}));

	return (
		<div className="pointer-events-none absolute inset-0">
			<svg
				className="h-full w-full text-slate-950 dark:text-white"
				viewBox="0 0 696 316"
				fill="none"
			>
				{paths.map((path) => (
					<motion.path
						key={path.id}
						d={path.d}
						stroke="currentColor"
						strokeWidth={path.width}
						strokeOpacity={0.1 + path.id * 0.03}
						initial={{ pathLength: 0.3, opacity: 0.6 }}
						animate={{
							pathLength: 1,
							opacity: [0.3, 0.6, 0.3],
							pathOffset: [0, 1, 0],
						}}
						transition={{
							duration: 20 + Math.random() * 10,
							repeat: Number.POSITIVE_INFINITY,
							ease: 'linear',
						}}
					/>
				))}
			</svg>
		</div>
	);
}

export const AuthSeparator = () => {
	return (
		<div className="flex w-full items-center justify-center">
			<div className="bg-border h-px w-full" />
			<span className="text-muted-foreground px-2 text-xs">OR</span>
			<div className="bg-border h-px w-full" />
		</div>
	);
};

