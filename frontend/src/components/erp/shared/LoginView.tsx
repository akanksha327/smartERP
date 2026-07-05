'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Chrome, KeyRound, Mail, User, Building } from 'lucide-react';

export function LoginView() {
  const { login, register, loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setError('Please fill in all fields.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await login(loginEmail, loginPassword);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword || !regConfirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await register(regEmail, regPassword, regName);
    } catch (err: any) {
      setError(err.message || 'Failed to create account.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0d121f] via-[#080a10] to-[#1a102f] p-4 relative overflow-hidden">
      {/* Background glowing blobs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="w-full max-w-[440px] z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/25 mb-3 border border-white/10">
            <Building className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white bg-clip-text bg-gradient-to-r from-white via-white to-gray-400">
            Smart<span className="text-primary">ERP</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">Billing, Inventory & Business Suite</p>
        </div>

        {/* Card containing Tabs */}
        <Card className="border-white/[0.08] bg-[#0c101d]/60 backdrop-blur-xl shadow-2xl dark:shadow-black/50 text-white rounded-2xl overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-center text-white">Welcome back</CardTitle>
            <CardDescription className="text-center text-gray-400 text-xs">
              Access your ERP business workspace
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4 bg-destructive/10 border-destructive/20 text-destructive-foreground">
                <AlertDescription className="text-xs">{error}</AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid grid-cols-2 bg-white/[0.04] p-1 rounded-lg border border-white/[0.05] mb-6">
                <TabsTrigger 
                  value="login" 
                  className="rounded-md py-2 text-xs font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="register"
                  className="rounded-md py-2 text-xs font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow"
                >
                  Register
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="login-email" className="text-xs text-gray-300 font-medium">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4.5 w-4.5 text-gray-500" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="admin@smarterp.com"
                        className="pl-10 bg-white/[0.02] border-white/[0.08] focus:border-primary/50 text-white placeholder-gray-500 text-sm h-10 rounded-lg"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="login-password" className="text-xs text-gray-300 font-medium">Password</Label>
                    </div>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-2.5 h-4.5 w-4.5 text-gray-500" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 bg-white/[0.02] border-white/[0.08] focus:border-primary/50 text-white placeholder-gray-500 text-sm h-10 rounded-lg"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-medium text-sm h-10 rounded-lg shadow-md shadow-primary/10 mt-2" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" /> Authenticating...
                      </span>
                    ) : (
                      'Sign In to Dashboard'
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register">
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="reg-name" className="text-xs text-gray-300 font-medium">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4.5 w-4.5 text-gray-500" />
                      <Input
                        id="reg-name"
                        type="text"
                        placeholder="John Doe"
                        className="pl-10 bg-white/[0.02] border-white/[0.08] focus:border-primary/50 text-white placeholder-gray-500 text-sm h-10 rounded-lg"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="reg-email" className="text-xs text-gray-300 font-medium">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4.5 w-4.5 text-gray-500" />
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10 bg-white/[0.02] border-white/[0.08] focus:border-primary/50 text-white placeholder-gray-500 text-sm h-10 rounded-lg"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="reg-password" className="text-xs text-gray-300 font-medium">Password</Label>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-2.5 h-4.5 w-4.5 text-gray-500" />
                      <Input
                        id="reg-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 bg-white/[0.02] border-white/[0.08] focus:border-primary/50 text-white placeholder-gray-500 text-sm h-10 rounded-lg"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="reg-confirm" className="text-xs text-gray-300 font-medium">Confirm Password</Label>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-2.5 h-4.5 w-4.5 text-gray-500" />
                      <Input
                        id="reg-confirm"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 bg-white/[0.02] border-white/[0.08] focus:border-primary/50 text-white placeholder-gray-500 text-sm h-10 rounded-lg"
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-medium text-sm h-10 rounded-lg shadow-md shadow-primary/10 mt-2" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" /> Registering...
                      </span>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/[0.06]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0b0e1a] px-2 text-gray-500 text-[10px] tracking-wider">Or continue with</span>
              </div>
            </div>

            {/* Google Sign In */}
            <Button
              variant="outline"
              type="button"
              className="w-full bg-white/[0.02] hover:bg-white/[0.06] border-white/[0.08] hover:border-white/[0.12] text-white hover:text-white font-medium text-sm h-10 rounded-lg flex items-center justify-center gap-2"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <Chrome className="h-4 w-4 text-primary" />
              Sign In with Google
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-white/[0.04] py-4 bg-black/10">
            <span className="text-[10px] text-gray-500 text-center">
              Protected by Firebase Authentication & SmartERP Security Policies
            </span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
