export interface RoundResult {
  round: number; // round index (starting from 1)
  pairs: [number, number][]; // round matches (includes only that will play)
}

export interface Auth0Resp {
  sub: string; // google-oauth2|108332590546503894117
  given_name: string;
  family_name: string;
  nickname: string; // from email, before @
  name: string; // given_name + family_name
  picture: string; // url
  locale: string;
  updated_at: string; // timestamp
}

export interface CompetitionFormInput {
  competitionName: string;
  winPts: number;
  drawPts: number;
  lossPts: number;
  teams: { name: string }[];
}

export interface TeamScoreInput {
  team1Score: string;
  team2Score: string;
  team1Id: string;
  team2Id: string;
  matchId: string;
}
