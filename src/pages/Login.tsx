import { useState } from "react";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

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
  const [loading, setLoading] = useState(false);
  const [showPatientLogin, setShowPatientLogin] = useState(true);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setTimeout(() => {
        toast({
          title: "OTP Sent",
          description: "A 6-digit OTP has been sent to your phone number"
        });
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
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-16 bg-welli-pale-green">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            {!showPatientLogin ? (
              <Card className="border-welli-light-green shadow-lg">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center text-welli-text-dark">
                    Select Login Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="w-full bg-welli-dark-green hover:bg-welli-green" onClick={() => setShowPatientLogin(true)}>
                      Login as Patient
                    </Button>
                    <Button className="w-full bg-welli-dark-green hover:bg-welli-green" onClick={() => window.location.href = '/doctors'}>
                      Login as Doctor
                    </Button>
                    <Button className="w-full bg-welli-dark-green hover:bg-welli-green" onClick={() => window.location.href = '/assistants'}>
                      Login as Assistant
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-welli-light-green shadow-lg">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center text-welli-text-dark">
                    Login to Welli (Patient)
                  </CardTitle>
                  <CardDescription className="text-center">
                    Enter your Aadhaar and phone number to continue
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
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
                    <Button type="submit" className="w-full bg-welli-dark-green hover:bg-welli-green" disabled={loading}>
                      {loading ? "Sending..." : "Get OTP"}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button variant="ghost" className="w-full text-welli-text-medium" onClick={() => setShowPatientLogin(false)}>
                    Other Login Options
                  </Button>
                </CardFooter>
              </Card>
            )}
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
