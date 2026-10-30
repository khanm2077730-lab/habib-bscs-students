import React, { useState } from 'react';
import {
  Lock,
  Mail,
  User as UserIcon,
  Eye,
  EyeOff,
  ArrowRight,
  Laptop,
  Code2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowLeft,
  KeyRound,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SITE_CONFIG } from '../data/constants';

interface AuthPageProps {
  initialMode?: 'signin' | 'signup' | 'forgot';
  onSuccess: () => void;
  onCancel?: () => void;
  intendedActionMessage?: string;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'signin',
  onSuccess,
  onCancel,
  intendedActionMessage
}) => {
  const { signUp, signIn, resetPassword, authError, authErrorCode, clearAuthError } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localValidationErrors, setLocalValidationErrors] = useState<Record<string, string>>({});
  const [resetSentSuccess, setResetSentSuccess] = useState<string | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rollNumber, setRollNumber] = useState('');

  const switchMode = (newMode: 'signin' | 'signup' | 'forgot') => {
    setMode(newMode);
    clearAuthError();
    setLocalValidationErrors({});
    setResetSentSuccess(null);
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Please provide a valid email format (e.g., student@university.edu).';
    }

    if (mode === 'signup') {
      if (!fullName.trim()) {
        errors.fullName = 'Full name is required.';
      } else if (fullName.trim().length < 2) {
        errors.fullName = 'Name must be at least 2 characters.';
      }

      if (!password) {
        errors.password = 'Password is required.';
      } else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters.';
      }

      if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match.';
      }
    } else if (mode === 'signin') {
      if (!password) {
        errors.password = 'Password is required.';
      }
    }

    setLocalValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    if (mode === 'signup') {
      const ok = await signUp(email, password, fullName, rollNumber);
      setIsSubmitting(false);
      if (ok) {
        onSuccess();
      }
    } else if (mode === 'signin') {
      const ok = await signIn(email, password);
      setIsSubmitting(false);
      if (ok) {
        onSuccess();
      }
    } else if (mode === 'forgot') {
      const res = await resetPassword(email);
      setIsSubmitting(false);
      if (res.success) {
        setResetSentSuccess(res.message);
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4 sm:px-6">
      <div className="w-full max-w-md space-y-6">
        {/* Back Link if cancel provided */}
        {onCancel && (
          <button
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue as Guest</span>
          </button>
        )}

        {/* Intended Action Notice (e.g. "Sign in to access your personal dashboard") */}
        {intendedActionMessage && (
          <div className="p-3.5 rounded-2xl bg-blue-950/60 border border-blue-800/60 flex items-start gap-3 text-xs text-blue-200">
            <ShieldCheck className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
            <div>
              <strong className="block font-semibold">Account Access Required</strong>
              <span>{intendedActionMessage}</span>
            </div>
          </div>
        )}

        {/* Card Container */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 relative">
          {/* Decorative Corner Glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />

          {/* Header & Logo */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 p-0.5 shadow-lg shadow-blue-500/20 mb-1">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Laptop className="w-6 h-6 text-blue-400" />
              </div>
            </div>

            <h2 className="text-2xl font-black text-white tracking-tight">
              {mode === 'signin' && 'Sign in to Habib BSCS'}
              {mode === 'signup' && 'Create BSCS Account'}
              {mode === 'forgot' && 'Reset Your Password'}
            </h2>

            <p className="text-xs text-slate-400">
              {mode === 'signin' && 'Access your cloud-saved progress, quiz history, and study notes.'}
              {mode === 'signup' && 'Join fellow computer science students and track your university progress.'}
              {mode === 'forgot' && 'Enter your registered email and we will send you a reset link.'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          {mode !== 'forgot' && (
            <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold font-mono">
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className={`py-2 rounded-lg transition-all ${
                  mode === 'signin'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => switchMode('signup')}
                className={`py-2 rounded-lg transition-all ${
                  mode === 'signup'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>
          )}

          {/* Firebase Error Message Display */}
          {authError && (
            <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-xs text-red-200 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p className="font-medium leading-relaxed">{authError}</p>
                {authErrorCode === 'auth/operation-not-allowed' && (
                  <div className="pt-2 border-t border-red-900/60 text-[11px] text-red-300">
                    <strong>Firebase Setup Tip:</strong> In your Firebase Console, open{' '}
                    <span className="font-mono bg-red-900/40 px-1 rounded">Authentication &gt; Sign-in method</span>,
                    click <strong>Email/Password</strong> and enable it.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Password Reset Sent Notice */}
          {resetSentSuccess && (
            <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-xs text-emerald-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block font-bold">Email Sent!</strong>
                <span>{resetSentSuccess}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name (Sign Up only) */}
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Full Name</span>
                  <span className="text-[10px] text-slate-500 font-mono">Required</span>
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Muhammad Habib"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-950 rounded-xl border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                {localValidationErrors.fullName && (
                  <p className="text-[11px] text-red-400 font-medium">
                    {localValidationErrors.fullName}
                  </p>
                )}
              </div>
            )}

            {/* Roll Number / Student ID (Optional for Sign Up) */}
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Roll / Student ID (Optional)</span>
                  <span className="text-[10px] text-slate-500 font-mono">BSCS Batch</span>
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    placeholder="e.g. BSCS-F24-108"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-950 rounded-xl border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Email Address</span>
                <span className="text-[10px] text-slate-500 font-mono">University or Personal</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-950 rounded-xl border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              {localValidationErrors.email && (
                <p className="text-[11px] text-red-400 font-medium">
                  {localValidationErrors.email}
                </p>
              )}
            </div>

            {/* Password (Sign In & Sign Up) */}
            {mode !== 'forgot' && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-slate-300">Password</label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => switchMode('forgot')}
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-950 rounded-xl border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1.5 text-slate-400 hover:text-slate-200 absolute right-2.5 top-1/2 -translate-y-1/2"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {localValidationErrors.password && (
                  <p className="text-[11px] text-red-400 font-medium">
                    {localValidationErrors.password}
                  </p>
                )}
              </div>
            )}

            {/* Confirm Password (Sign Up only) */}
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Confirm Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-950 rounded-xl border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="p-1.5 text-slate-400 hover:text-slate-200 absolute right-2.5 top-1/2 -translate-y-1/2"
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {localValidationErrors.confirmPassword && (
                  <p className="text-[11px] text-red-400 font-medium">
                    {localValidationErrors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-blue-500/30"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : mode === 'signin' ? (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : mode === 'signup' ? (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Send Reset Email</span>
                  <Mail className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Bottom Switcher Footer */}
          <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            {mode === 'signin' && (
              <p>
                Don&apos;t have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('signup')}
                  className="text-blue-400 hover:text-blue-300 font-bold underline"
                >
                  Create one now
                </button>
              </p>
            )}

            {mode === 'signup' && (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('signin')}
                  className="text-blue-400 hover:text-blue-300 font-bold underline"
                >
                  Sign in here
                </button>
              </p>
            )}

            {mode === 'forgot' && (
              <p>
                Remembered your password?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('signin')}
                  className="text-blue-400 hover:text-blue-300 font-bold underline"
                >
                  Back to Sign In
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Security & Privacy Notice */}
        <div className="text-center text-[11px] text-slate-500 space-y-1">
          <p className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Encrypted Firebase Authentication • Passwords are never saved in plain text</span>
          </p>
          <p>Habib BSCS Students &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};
