export interface ISession {
  id: number;
  timerRecorded: number;
  createdAt: number;
  userId: number;
}

export interface ITimerSession extends ISession {}
export interface IChronoSession extends ISession {}