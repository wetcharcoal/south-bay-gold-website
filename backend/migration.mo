import List "mo:base/List";
import Time "mo:base/Time";

module {
  type OldActor = {
    appointments : List.List<{
      location : Text;
      description : Text;
      timestamp : Time.Time;
    }>;
  };

  type NewActor = {
    appointments : List.List<{
      location : Text;
      description : Text;
      timestamp : Time.Time;
    }>;
  };

  public func run(old : OldActor) : NewActor {
    old;
  };
};
