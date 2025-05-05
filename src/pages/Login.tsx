import { useState } from "react";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Shield, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Login = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 12) {
      setAadhaarNumber(value);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (aadhaarNumber.length !== 12) {
        toast({
          title: "Invalid Aadhaar Number",
          description: "Please enter a valid 12-digit Aadhaar number",
          variant: "destructive"
        });
        return;
      }
      if (phoneNumber.length !== 10) {
        toast({
          title: "Invalid Phone Number",
          description: "Please enter a valid 10-digit phone number",
          variant: "destructive"
        });
        return;
      }
      setLoading(true);
      try {
        // TODO: Implement OTP sending logic with your backend or a third-party service
        // Placeholder: Simulate OTP sent
        setTimeout(() => {
          toast({
            title: "OTP Sent",
            description: "A 6-digit OTP has been sent to your phone number"
          });
          setStep(2);
          setLoading(false);
        }, 1000);
        return;
      } catch (err: any) {
        toast({
          title: "Error sending OTP",
          description: err.message || "Could not send OTP. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    } else {
      if (otp.length !== 6) {
        toast({
          title: "Invalid OTP",
          description: "Please enter the 6-digit OTP sent to your phone",
          variant: "destructive"
        });
        return;
      }
      setLoading(true);
      try {
        // TODO: Implement OTP verification logic
        toast({
          title: "Login Successful",
          description: "You have successfully logged in to your account"
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } catch (err: any) {
        toast({
          title: "Invalid OTP",
          description: err.message || "The OTP entered is incorrect.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-16 bg-welli-pale-green">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <Card className="border-welli-light-green shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center text-welli-text-dark">
                  {step === 1 ? "Login to Welli" : "Verify OTP"}
                </CardTitle>
                <CardDescription className="text-center">
                  {step === 1 
                    ? "Enter your Aadhaar and phone number to continue" 
                    : "Enter the 6-digit OTP sent to your phone"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {step === 1 ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="aadhaar">Aadhaar Number</Label>
                        <div className="relative">
                          <Input
                            id="aadhaar"
                            placeholder="Enter 12-digit Aadhaar number"
                            className="pl-10"
                            value={aadhaarNumber}
                            onChange={handleAadhaarChange}
                            required
                          />
                          <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-welli-text-medium w-4 h-4" />
                        </div>
                        <p className="text-xs text-welli-text-medium">Your Aadhaar details are secure and encrypted</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Input
                            id="phone"
                            placeholder="Enter 10-digit mobile number"
                            className="pl-10"
                            value={phoneNumber}
                            onChange={handlePhoneChange}
                            required
                          />
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-welli-text-medium">+91</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input
                        id="otp"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={handleOtpChange}
                        required
                        className="text-center text-lg tracking-wider"
                      />
                      <div className="flex items-center justify-between">
                        <button 
                          type="button" 
                          className="text-sm text-welli-dark-green hover:underline"
                          onClick={() => {
                            toast({
                              title: "OTP Resent",
                              description: "A new OTP has been sent to your phone"
                            });
                          }}
                        >
                          Resend OTP
                        </button>
                        <span className="text-sm text-welli-text-medium">Valid for 10 minutes</span>
                      </div>
                    </div>
                  )}
                  <Button type="submit" className="w-full bg-welli-dark-green hover:bg-welli-green" disabled={loading}>
                    {loading ? (step === 1 ? "Sending..." : "Verifying...") : (step === 1 ? "Get OTP" : "Verify & Login")}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-center w-full">
                  <p className="text-sm text-welli-text-medium">
                    By continuing, you agree to Welli's{" "}
                    <Link to="/terms" className="text-welli-dark-green hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-welli-dark-green hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
                {step === 2 && (
                  <Button 
                    variant="ghost" 
                    className="w-full text-welli-text-medium"
                    onClick={() => setStep(1)}
                  >
                    Go back
                  </Button>
                )}
              </CardFooter>
            </Card>

            <div className="mt-8 bg-white p-6 rounded-lg border border-welli-light-green">
              <div className="flex items-start space-x-4">
                <AlertCircle className="text-welli-dark-green flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-welli-text-dark">Why we use Aadhaar verification</h3>
                  <p className="text-sm text-welli-text-medium mt-1">
                    Aadhaar verification helps us create a secure profile and maintain 
                    accurate medical records for your family. Your data is encrypted and 
                    protected according to healthcare privacy standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
