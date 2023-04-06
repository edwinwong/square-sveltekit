<script lang="ts">
  export let data
  </script>
  
  {#if data.error}
  <div class="wrapper">
    <div class="messages">Error: {data.error}</div>
  </div>
  {:else}
  <div class="wrapper">
    <div class="messages">
      <h1>Authorization Succeeded</h1>
      <div style='color:rgba(204, 0, 35, 1)'><strong>Caution:</strong> NEVER store or share OAuth access tokens or refresh tokens in clear text.
        Use a strong encryption standard such as AES to encrypt OAuth tokens. Ensure the production encryption key is not
        accessible to anyone who does not need it.
      </div>
      <br/>
      <div><strong>OAuth access token:</strong> {data.accessToken} </div>
      <div><strong>OAuth access token expires at:</strong> {data.expiresAt} </div>
      <div><strong>OAuth refresh token:</strong> {data.refreshToken} </div>
      <div><strong>Merchant Id:</strong> {data.merchantId} </div>
      <div><p>You can use this OAuth access token to call Create Payment and other APIs that were authorized by this seller.</p>
        <p>Try it out with <a href='https://developer.squareup.com/explorer/square/payments-api/create-payment' target='_blank'>API Explorer</a>.</p>
      </div>
    </div>
  </div>
  {/if}
  