import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";

export default function About() {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">About</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="ion-padding">
          <p>
            🍽️ Welcome to [Your Website Name], where we serve restaurants like
            yours with a powerful order management tool. You can efficiently
            manage your orders, track sales, and record expenses with ease,
            tailored to the restaurant industry.
          </p>
          <p>
            <em>
              If you're completely new to React, learning the{" "}
              <a href="https://reactjs.org/docs/hello-world.html">
                main concepts
              </a>{" "}
              will get you off to a great start. You'll also see comments and
              links to supporting resources throughout the code.
            </em>
          </p>

          <h3 className="mt-5">Key Features:</h3>
          <ul>
            <li>
              <strong>Order Management:</strong> 📋 Effortlessly organize and
              keep track of customer orders received via WhatsApp and in-house
              dining. Say goodbye to order chaos in your restaurant. 🚀
            </li>
            <li>
              <strong>Sales Statistics:</strong> 📈 Gain in-depth insights into
              your restaurant's performance. Our sales analytics tools allow you
              to make informed decisions and drive growth. 📊
            </li>
            <li>
              <strong>Expense Tracking:</strong> 💰 Managing expenses is crucial
              for restaurant success. Our platform simplifies expense recording
              and categorization for financial clarity. 💡
            </li>
          </ul>

          <p className="mt-5">
            Your restaurant's success is our priority, and we're here to serve
            you with a simplified order management tool designed exclusively for
            restaurants.🚀
          </p>
        </div>
      </IonContent>
    </>
  );
}
