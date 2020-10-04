interface Message {
  type: string,
  payload: { 
    sdp? : string,
    candidate? : RTCIceCandidate
  }
}

type SubscriberFunction = (message : Message) => void;

const subscriptions : SubscriberFunction[] = [];

export function publish(message : Message) {
  subscriptions.forEach(subFn => subFn(message));
}

export function subscribe(fn : SubscriberFunction) {
  subscriptions.push(fn);
}