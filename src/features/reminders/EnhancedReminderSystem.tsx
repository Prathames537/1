import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Pill, StretchHorizontal, Dumbbell } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

interface Reminder {
  id: string;
  title: string;
  type: 'medication' | 'yoga' | 'exercise';
  time: string;
  days: string[];
  isActive: boolean;
  created_at?: string;
}

export const EnhancedReminderSystem: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newReminder, setNewReminder] = useState<Partial<Reminder>>({
    type: 'medication',
    days: [],
    isActive: true,
  });
  const [loading, setLoading] = useState(false);

  const fetchReminders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reminders')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setReminders(data || []);
    setLoading(false);
  };

  const handleAddReminder = async () => {
    if (!newReminder.title || !newReminder.time) return;
    setLoading(true);
    const { error } = await supabase.from('reminders').insert([
      {
        reminder_text: newReminder.title,
        reminder_time: newReminder.time,
        days: newReminder.days,
        type: newReminder.type,
        is_active: newReminder.isActive,
        // user_id: (add user id if available)
      },
    ]);
    if (!error) {
      setNewReminder({ type: 'medication', days: [], isActive: true });
      fetchReminders();
    }
    setLoading(false);
  };

  const toggleReminder = async (id: string, isActive: boolean) => {
    setLoading(true);
    await supabase.from('reminders').update({ is_active: !isActive }).eq('id', id);
    fetchReminders();
    setLoading(false);
  };

  const deleteReminder = async (id: string) => {
    setLoading(true);
    await supabase.from('reminders').delete().eq('id', id);
    fetchReminders();
    setLoading(false);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'medication':
        return <Pill className="h-5 w-5" />;
      case 'yoga':
        return <StretchHorizontal className="h-5 w-5" />;
      case 'exercise':
        return <Dumbbell className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  useEffect(() => { fetchReminders(); }, []);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Enhanced Reminder System</h2>

      {/* Add New Reminder */}
      <Card className="p-4">
        <h3 className="text-xl font-semibold mb-4">Add New Reminder</h3>
        <div className="space-y-4">
          <div>
            <Label>Reminder Type</Label>
            <select
              className="w-full p-2 border rounded"
              value={newReminder.type}
              onChange={(e) =>
                setNewReminder({ ...newReminder, type: e.target.value as "medication" | "yoga" | "exercise" })
              }
            >
              <option value="medication">Medication</option>
              <option value="yoga">Yoga Session</option>
              <option value="exercise">Exercise</option>
            </select>
          </div>
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Enter reminder title"
              value={newReminder.title || ''}
              onChange={(e) =>
                setNewReminder({ ...newReminder, title: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Time</Label>
            <Input
              type="time"
              value={newReminder.time || ''}
              onChange={(e) =>
                setNewReminder({ ...newReminder, time: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Days</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <Button
                  key={day}
                  variant={newReminder.days?.includes(day) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    const days = newReminder.days || [];
                    setNewReminder({
                      ...newReminder,
                      days: days.includes(day)
                        ? days.filter((d) => d !== day)
                        : [...days, day],
                    });
                  }}
                >
                  {day}
                </Button>
              ))}
            </div>
          </div>
          <Button className="w-full" onClick={handleAddReminder} disabled={loading}>
            {loading ? 'Adding...' : 'Add Reminder'}
          </Button>
        </div>
      </Card>

      {/* Reminders List */}
      <Card className="p-4">
        <h3 className="text-xl font-semibold mb-4">Your Reminders</h3>
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex items-center justify-between p-3 border rounded"
            >
              <div className="flex items-center space-x-3">
                {getIcon(reminder.type)}
                <div>
                  <p className="font-medium">{reminder.title}</p>
                  <p className="text-sm text-gray-500">
                    {reminder.days.join(', ')} at {reminder.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={reminder.isActive}
                  onCheckedChange={() => toggleReminder(reminder.id, reminder.isActive)}
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteReminder(reminder.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
          {reminders.length === 0 && (
            <p className="text-center text-gray-500">No reminders set</p>
          )}
        </div>
      </Card>
    </div>
  );
}; 