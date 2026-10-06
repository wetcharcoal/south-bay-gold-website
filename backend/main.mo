import OutCall "http-outcalls/outcall";
import Time "mo:base/Time";
import List "mo:base/List";
import Text "mo:base/Text";

actor {
  type Appointment = {
    location : Text;
    description : Text;
    timestamp : Time.Time;
  };

  var appointments : List.List<Appointment> = List.nil<Appointment>();

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public func fetchMarketSpotPrices() : async Text {
    let url = "https://api.metalpriceapi.com/v1/latest?api_key=YOUR_API_KEY&base=USD&currencies=XAU,XAG,XPT,XPD";
    await OutCall.httpGetRequest(url, [], transform);
  };

  public func fetchGoldBuyPrices() : async Text {
    let url = "https://api.example.com/gold-buy-prices";
    await OutCall.httpGetRequest(url, [], transform);
  };

  public func bookAppointment(location : Text, description : Text) : async () {
    let appointment : Appointment = {
      location;
      description;
      timestamp = Time.now();
    };
    appointments := List.push(appointment, appointments);
  };

  public query func getAppointments() : async [Appointment] {
    List.toArray(appointments);
  };
};
