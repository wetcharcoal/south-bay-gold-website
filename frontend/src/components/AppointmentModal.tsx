import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useBookAppointment } from '@/hooks/useQueries';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface AppointmentModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AppointmentModal({ open, onOpenChange }: AppointmentModalProps) {
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const bookAppointment = useBookAppointment();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!location || !description.trim()) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            await bookAppointment.mutateAsync({ location, description });
            toast.success('Appointment request submitted successfully!');
            setLocation('');
            setDescription('');
            onOpenChange(false);
        } catch (error) {
            toast.error('Failed to submit appointment request');
            console.error('Error booking appointment:', error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gold">Book an Appointment</DialogTitle>
                    <DialogDescription>
                        Select your preferred location and tell us what you'd like to buy or sell.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="location">Store Location</Label>
                            <Select value={location} onValueChange={setLocation}>
                                <SelectTrigger id="location">
                                    <SelectValue placeholder="Select a location" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Manhattan Beach">Manhattan Beach</SelectItem>
                                    <SelectItem value="Torrance">Torrance</SelectItem>
                                    <SelectItem value="Redondo Beach">Redondo Beach</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">What would you like to buy or sell?</Label>
                            <Textarea
                                id="description"
                                placeholder="Please describe the items you'd like to buy or sell..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={5}
                                className="resize-none"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={bookAppointment.isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-gold hover:bg-gold-dark"
                            disabled={bookAppointment.isPending}
                        >
                            {bookAppointment.isPending && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Submit Request
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
