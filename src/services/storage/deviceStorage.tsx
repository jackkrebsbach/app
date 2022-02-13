import AsyncStorage from '@react-native-async-storage/async-storage';

export let userData = {};
export let userProfile = {};
export let jwt = "";


const deviceStorage = {
    // our AsyncStorage functions will go here :)
    async saveItem(key, value) {
        try {
          console.log("savin:", value);
          await AsyncStorage.setItem(key, value);
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
      },

      async loadJWT() {
        try {
            let data = await AsyncStorage.getItem("jwt");
            jwt = JSON.parse(data);
            console.log("jwt", jwt)
          } catch (error) {
            console.log("Something went wrong", error);
          }
         
      },

      async loadUser() {
        try {
            let data = await AsyncStorage.getItem("user_auth");
            userData = JSON.parse(data);
            console.log("userdata", userData)
          } catch (error) {
            console.log("Something went wrong", error);
          }
         
      },

      async deleteUser() {
        try{
          await AsyncStorage.removeItem('user_auth')
          .then(
            () => {
              userData = null
            }
          );
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
      },


      async loadProfile() {
        try {
            let data = await AsyncStorage.getItem("user_profile");
            userProfile = JSON.parse(data);
            console.log("userProfile", data);

          } catch (error) {
            console.log("Something went wrong", error);
          }
         
      },

      async mergeProfile(data) {
        try {
          let result = await AsyncStorage.mergeItem("user_profile",data);
          console.log("userProfile", result )

        } catch (error) {
          console.log("Something went wrong", error);

        }
      },
      async deleteProfile() {
        try{
          await AsyncStorage.removeItem('user_profile')
          .then(
            () => {
              userProfile = null
            }
          );
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
      }

      
};

export default deviceStorage;