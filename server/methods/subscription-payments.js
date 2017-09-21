import accounting from "accounting-js";
import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";
import {Random} from "meteor/random";
import {Reaction, Logger as logger} from "/server/api";
import {Cart, Shops, Accounts, Packages} from "/lib/collections";
import {SubscriptionManager} from "../lib/subscriptionManager"

const Future = Npm.require( 'fibers/future' );



function selectedPaymentProvider() {

    return "stripe";
}


function userHasAccount() {
    return false;
}

function userHasStripeAccount(stripeCustomerId) {


    return false;
}

function isCancellation() {

    false;
}


function processNewSubscription() {

}

function processCancellation() {


}


Meteor.methods({
    "subscriptions/process":  function (user, cart, planId) {

        check(user, Object)
        check(planId, String)
        check(cart, Object)


        let future = new Future();

        logger.info(`Processing subscription for user ${user._id}`);

        let manager = SubscriptionManager(selectedPaymentProvider());


        try {

            //User does not have account
            let subscription = {user: user, cart: cart, planId: planId}
            future.return(manager.createSubscription(subscription));

        } catch (err) {
            logger.error("Error processing subscription");
        }

        return future.wait();

    }


})

