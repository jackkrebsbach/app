import AsyncStorage from '@react-native-async-storage/async-storage';

export let userData = {};
export let userProfile = {};
export let jwt = {};
export let nft = {};



const deviceStorage = {
    // our AsyncStorage functions will go here :)
    async saveItem(key, value) {
        try {
          console.log("saving:", key, value);
          await AsyncStorage.setItem(key, value);
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
      },

      async loadNFT() {
        try {
            let data = await AsyncStorage.getItem("nft");
            nft = JSON.parse(data);
            console.log("nft", nft)
          } catch (error) {
            console.log("Something went wrong", error);
          }
         
      },


      async loadJWT() {
        try {
            let data = await AsyncStorage.getItem("user_auth");
            jwt = JSON.parse(data);
            console.log("jwt", jwt)
          } catch (error) {
            console.log("Something went wrong", error);
          }
         
      },

      async loadUser() {
        try {
            let data = await AsyncStorage.getItem("user_data");
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
      },

      async deleterJWT() {
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

      async deleteNft() {
        try{
          await AsyncStorage.removeItem('nft')
          .then(
            () => {
              userData = null
            }
          );
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
      }
      
};

export default deviceStorage;