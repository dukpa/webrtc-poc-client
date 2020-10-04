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
  setTimeout(() => {
    subscriptions.forEach(subFn => subFn(message));
  }, 500);
}

export function subscribe(fn : SubscriberFunction) {
  subscriptions.push(fn);
}