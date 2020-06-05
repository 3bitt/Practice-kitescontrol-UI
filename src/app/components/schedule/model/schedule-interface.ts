

export interface ISchedule {
  instructors: IScheduleInstructor[];
}

export interface IScheduleInstructor {
  id:      number;
  name:    string;
  surname: string;
  weight:  number;
  lessons: Lesson[];
}

export interface Lesson {
  id:           number;
  date:         string;
  time:         string;
  created_date: string;
  duration:     number;
  paid:         boolean;
  status:       string;
  in_progress:   boolean;
  equipment:    string;
  kite_brand:   string;
  kite_size:    number;
  board:        string;
  comment:      string;
  student:      Student[];
  instructor:   LessonInstructor[];
}

export interface LessonInstructor {
  id:        number;
  name:      string;
  surname:   string;
  nickname:  string;
  iko_level: string;
}

export interface Student {
  id:         number;
  name:       string;
  surname:    string;
  birth_date: string;
  weight:     number;
  iko_level:  string;
  comment:    string;
}
