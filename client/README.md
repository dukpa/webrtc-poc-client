## WebRTC PoC Client
This is the client side of a small project I created to learn WebRTC. At the moment, the client-side does the minimum:
- Sets up a camera feed in a video element
- Uses a simple pubsub to fake a signalling service
- Sets up a WebRTC connection (with itself)
- Dispalys the resulting video feed in a second video element

## Setup
Should be a straightforward process as this is created from a create-react-app template:
```
git clone https://github.com/dukpa/webrtc-poc-client
npm install
npm start
```