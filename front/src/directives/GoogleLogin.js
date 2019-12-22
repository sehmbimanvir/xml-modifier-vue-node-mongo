import Vue from 'vue'

export default Vue.directive('google-signin-button', {
  bind: function (el, binding, vnode) {
    checkComponentMethods()
    let clientId = binding.value
    let googleSignInAPI = document.createElement('script')
    googleSignInAPI.setAttribute('src', 'https://apis.google.com/js/api:client.js')
    document.head.appendChild(googleSignInAPI)

    googleSignInAPI.onload = InitGoogleButton

    function InitGoogleButton () {
      gapi.load('auth2', () => {
        const auth2 = gapi.auth2.init({
          client_id: clientId,
          cookiepolicy: 'single_host_origin'
        })
        auth2.attachClickHandler(el, {},
          onSuccess,
          onFail
        )
      })
    }

    const onSuccess = googleUser => {
      vnode.context.onGoogleAuthSuccess(googleUser.getAuthResponse().id_token)
    }

    const onFail = error => {
      vnode.context.onGoogleAuthFail(error)
    }

    function checkComponentMethods () {
      if (!vnode.context.onGoogleAuthSuccess) {
        throw new Error('The method onGoogleAuthSuccess must be defined on the component')
      }

      if (!vnode.context.onGoogleAuthFail) {
        throw new Error('The method onGoogleAuthFail must be defined on the component')
      }
    }
  }
})