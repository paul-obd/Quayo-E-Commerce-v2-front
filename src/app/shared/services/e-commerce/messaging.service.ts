// import { Injectable } from '@angular/core';
// //import { AngularFireMessaging} from '@angular/fire/compat/messaging';
// import { BehaviorSubject } from 'rxjs'

// @Injectable({
//   providedIn: 'root'
// })
// export class MessagingService {
//   x: any = null
//   currentMessage = new BehaviorSubject(this.x);

//   constructor(private angularFireMessaging: AngularFireMessaging ) {

//   }
//   requestPermission() {
//     this.angularFireMessaging.requestToken.subscribe(
//       (token) => {
//         console.log(token);
//       },
//       (err) => {
//         console.error('Unable to get permission to notify.', err);
//       }
//     );
//   }
//   receiveMessage() {
//     this.angularFireMessaging.messages.subscribe(
//       (payload) => {
//         console.log("new message received. ", payload);
//         this.currentMessage.next(payload);
//       })
//   }
// } 