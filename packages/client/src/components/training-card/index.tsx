import { Card, CardContent } from '@/components/ui/card';
import { format, isPast } from 'date-fns';
import { Dumbbell, Phone, User } from 'lucide-react';
import { useMemo } from 'react';

interface TrainingSessionProps {
  trainerName: string;
  traineeName: string;
  startTime: Date;
  endTime: Date;
  trainerPhone: string;
}

export default function TrainingCard({
  trainerName,
  traineeName,
  startTime,
  endTime,
  trainerPhone,
}: TrainingSessionProps) {
  const formatDate = (date: Date) => format(date, 'MMMM d, yyyy');
  const formatTime = (date: Date) => format(date, 'h:mm a');
  const status = useMemo(() => {
    if (isPast(startTime)) {
      return 'Past';
    }
    return 'Upcoming';
  }, [startTime]);
  const color = useMemo(() => {
    if (status === 'Past') {
      return 'blue';
    }
    return 'emerald';
  }, [status]);

  return (
    <Card className={`w-full border-l-4 border-l-${color}-500 shadow-sm`}>
      <CardContent className="flex flex-col p-4 md:flex-row md:items-center md:justify-between md:gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-${color}-100`}
          >
            <Dumbbell className={`h-5 w-5 text-${color}-600`} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Session</p>
            <p className="font-medium">{formatDate(startTime)}</p>
            <p className="text-sm text-muted-foreground">
              {formatTime(startTime)} - {formatTime(endTime)}
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3 md:mt-0">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-${color}-100`}
          >
            <User className={`h-5 w-5 text-${color}-600`} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Trainer</p>
            <p className="font-medium">{trainerName}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3 md:mt-0">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-${color}-100`}
          >
            <User className={`h-5 w-5 text-${color}-600`} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Trainee</p>
            <p className="font-medium">{traineeName}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3 md:mt-0">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-${color}-100`}
          >
            <Phone className={`h-5 w-5 text-${color}-600`} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Phone</p>
            <p className="font-medium">{trainerPhone}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
