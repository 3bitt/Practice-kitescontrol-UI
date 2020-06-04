export class Instructor {

  constructor(
      public name:              string,
      public surname:           string,

      public nickname:          string,
      public mobile_number:     string,
      public email_address:     string,
      public birth_date:        string,
      public weight:            number,
      public available_from:    string,
      public available_to:      string,
      public iko_id:            number,
      public iko_level:         string,
      public pay_rate_single:   number,
      public pay_rate_group:    number,
      public english_lessons:   boolean,
      public kids_lessons:      boolean,
      public group_lessons:     boolean,
      public daily_hour_limit:  number,
      public active:            boolean
   ) { }
}
