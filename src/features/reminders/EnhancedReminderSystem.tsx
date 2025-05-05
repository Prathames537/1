import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Pill, StretchHorizontal, Dumbbell, Clock } from 'lucide-react';

interface Reminder {
  id: string;
  title: string;
  type: 'medication' | 'yoga' | 'exercise';
  time: string;
  days: string[];
  isActive: boolean;
}

export const EnhancedReminderSystem: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newReminder, setNewReminder] = useState<Partial<Reminder>>({
    type: 'medication',
    days: [],
    isActive: true,
  });

  const handleAddReminder = () => {
    if (!newReminder.title || !newReminder.time) return;

    const reminder: Reminder = {
      id: Math.random().toString(36).substr(2, 9),
      title: newReminder.title,
      type: newReminder.type as 'medication' | 'yoga' | 'exercise',
      time: newReminder.time,
      days: newReminder.days || [],
      isActive: true,
    };

    setReminders([...reminders, reminder]);
    setNewReminder({ type: 'medication', days: [], isActive: true });
  };

  const toggleReminder = (id: string) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, isActive: !reminder.isActive }
          : reminder
      )
    );
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
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
          <Button className="w-full" onClick={handleAddReminder}>
            Add Reminder
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
                  onCheckedChange={() => toggleReminder(reminder.id)}
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