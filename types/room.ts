interface QuizzesRoomResponse {
  id: number;
  title: string;
  room_code: string;
  status: string;
  duration_seconds: number;
  started_at: string;
  ended_at: string;
  questions: [
    {
      id: number;
      text: string;
      order: number;
      time_limit: number;
      choices: [
        {
          id: number;
          text: string;
          is_correct: boolean;
        }
      ];
    }
  ];
  students: [
    {
      id: number;
      name: string;
      joined_at: string;
    }
  ];
  time_remaining: number;
}
