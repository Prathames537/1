import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, User, Calendar, HeartPulse, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const defaultMember = { name: "", relation: "", dob: "", gender: "", age: "", medical: "", allergies: "" };

const FamilyAccountPage = () => {
  const { toast } = useToast();
  const [familyMembers, setFamilyMembers] = useState(1);
  const [members, setMembers] = useState([ { ...defaultMember } ]);
  const [loading, setLoading] = useState(false);
  
  const [saved, setSaved] = useState(false);
  const [familyList, setFamilyList] = useState<any[]>([]);

  const LOCAL_AI_URL = "http://localhost:8000/family-ai";
  const [aiTips, setAiTips] = useState<{ [idx: number]: { tips: string; risk: string } }>({});

  useEffect(() => {
    setFamilyList([]);
  }, [saved]);

  useEffect(() => {
    members.forEach((mem, idx) => {
      fetch(LOCAL_AI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: mem.name,
          age: Number(mem.age),
          medical: mem.medical,
          allergies: mem.allergies,
        }),
      })
        .then(res => res.json())
        .then(ai => setAiTips(t => ({ ...t, [idx]: ai })))
        .catch(() => {});
    });
  }, [members]);

  const handleChange = (idx: number, e: any) => {
    const { name, value } = e.target;
    setMembers(m => m.map((mem, i) => i === idx ? { ...mem, [name]: value } : mem));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setSaved(false);
    try {
      for (let i = 0; i < members.length; i++) {
        // Placeholder for the removed getAuth and addFamilyMember functions
      }
      setSaved(true);
      toast({ title: "Account created", description: "Family member profile(s) have been successfully created." });
      setMembers([ { ...defaultMember } ]);
      setFamilyMembers(1);
    } catch (err: any) {

    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = () => {
    setMembers(m => [ ...m, { ...defaultMember } ]);
    setFamilyMembers(n => n + 1);
  };


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-6">
          <Link to="/" className="inline-flex items-center text-welli-dark-green hover:text-welli-green mb-6">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-welli-text-dark">Create Family Member Account</h1>
            <div className="mb-8">
              <p className="text-welli-text-medium text-lg">
                Add your family members to create personalized health profiles for them. This will help us provide better care and keep track of their health needs.
              </p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-welli-dark-green" />
                  Family Member Details
                </CardTitle>
                <CardDescription>
                  Fill in the information about your family member
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">

  {members.map((mem, idx) => (
    <div key={idx} className="space-y-4 border-b pb-4 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`name-${idx}`}>Full Name</Label>
          <Input id={`name-${idx}`} name="name" value={mem.name} onChange={e => handleChange(idx, e)} placeholder="Enter full name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`relation-${idx}`}>Relationship</Label>
          <Input id={`relation-${idx}`} name="relation" value={mem.relation} onChange={e => handleChange(idx, e)} placeholder="e.g. Spouse, Child, Parent" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`dob-${idx}`}>Date of Birth</Label>
          <div className="flex">
            <div className="bg-welli-pale-green p-2 rounded-l-md">
              <Calendar className="w-5 h-5 text-welli-dark-green" />
            </div>
            <Input id={`dob-${idx}`} name="dob" type="date" value={mem.dob} onChange={e => handleChange(idx, e)} className="rounded-l-none" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor={`gender-${idx}`}>Gender</Label>
          <Input id={`gender-${idx}`} name="gender" value={mem.gender} onChange={e => handleChange(idx, e)} placeholder="Gender" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`medical-${idx}`}>Medical Conditions (if any)</Label>
        <div className="flex">
          <div className="bg-welli-pale-green p-2 rounded-l-md">
            <HeartPulse className="w-5 h-5 text-welli-dark-green" />
          </div>
          <Input id={`medical-${idx}`} name="medical" value={mem.medical} onChange={e => handleChange(idx, e)} placeholder="e.g. Diabetes, Asthma, None" className="rounded-l-none" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`allergies-${idx}`}>Allergies (if any)</Label>
        <Input id={`allergies-${idx}`} name="allergies" value={mem.allergies} onChange={e => handleChange(idx, e)} placeholder="e.g. Penicillin, Nuts, None" />
      </div>
      {aiTips[idx] && (
        <div className="bg-welli-pale-green rounded-lg p-3 mt-2">
          <div className="text-sm text-welli-dark-green font-semibold">AI Health Tips:</div>
          <div className="text-sm">{aiTips[idx].tips}</div>
          <div className="text-xs text-welli-text-medium mt-1">Risk: {aiTips[idx].risk}</div>
        </div>
      )}
    </div>
  ))}
  <Button type="submit" className="w-full bg-welli-dark-green hover:bg-welli-green" disabled={loading}>
    {loading ? "Saving..." : "Create Profile"}
  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline" type="button" onClick={handleAddMember}>
                  Add Another Family Member
                </Button>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-welli-dark-green" />
                  <span className="text-sm text-welli-text-medium">Family members: {familyMembers}</span>
                </div>
              </CardFooter>
            </Card>

            <div className="mt-12 bg-welli-pale-green p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-welli-text-dark">Your Family Members</h2>
              <ul className="space-y-2 pl-5 text-welli-text-medium">
                {familyList.length === 0 && <li>No family members saved yet.</li>}
                {familyList.map((mem, idx) => (
                  <li key={idx} className="border-b py-2">
                    <span className="font-semibold">{mem.name}</span> ({mem.relation})
                    {mem.healthData && (
                      <span className="ml-2 text-xs text-gray-500">{(() => { try { const d = JSON.parse(mem.healthData); return `${d.gender || ''}, DOB: ${d.dob || ''}, Med: ${d.medical || ''}, Allergies: ${d.allergies || ''}`; } catch { return ""; } })()}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 bg-welli-pale-green p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-welli-text-dark">Why Create Family Profiles?</h2>
              <ul className="space-y-2 list-disc pl-5 text-welli-text-medium">
                <li>Keep all health records in one secure place</li>
                <li>Get personalized health recommendations for each family member</li>
                <li>Schedule appointments easily for anyone in your family</li>
                <li>Track medication and treatment plans separately</li>
                <li>Share medical information with doctors when needed</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FamilyAccountPage;
