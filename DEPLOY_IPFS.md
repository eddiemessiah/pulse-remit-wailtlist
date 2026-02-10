# Deploying PulseRemit to Filecoin/IPFS & ENS

Since `fleek.co` might be pointing to a waitlist for their new "Fleek Network", you should use the **Legacy Fleek Platform** to deploy your site immediately.

## 1. Deploy to IPFS via Fleek (Legacy)

1.  **Go to the Legacy App**: Navigate to [https://app.fleek.co](https://app.fleek.co).
2.  **Sign In**: Use your GitHub account.
3.  **Add New Site**:
    *   Click "Add New Site".
    *   Connect your GitHub repository: `pulse-remit-wailtlist`.
4.  **Configure Build**:
    *   **Framework**: Next.js
    *   **Docker Image Status**: Use the default (or "Latest").
    *   **Build Command**: `npm run build`
    *   **Publish Directory**: `out` (Since we just enabled `output: 'export'`).
5.  **Deploy Site**: Click the button.
    *   Fleek will build your site and pin it to IPFS (Filecoin).
    *   Once done, you will get a **Current IPFS Hash** (CID) like `QmXyZ...`.

## 2. Point pulseremit.eth to Your IPFS Site

1.  **Copy the CID**: From your Fleek dashboard, copy the "IPFS Hash" or "CID" of your deployed site.
2.  **Go to ENS App**: Visit [app.ens.domains](https://app.ens.domains) and connect your wallet.
3.  **Manage Name**: Search for `pulseremit.eth` and go to details.
4.  **Set Content Hash**:
    *   Click "Add/Edit Record".
    *   Scroll to **Content Hash**.
    *   Select `IPFS` from the dropdown (or paste `ipfs://` followed by your hash).
    *   Examples: `ipfs://QmXyZ123...`
5.  **Confirm Transaction**: Sign and pay the gas fee to update the record on-chain.

## 3. Propagation
*   It may take a few minutes for the update to propagate.
*   Users can now access your site via:
    *   `https://pulseremit.eth.limo` (Web2 gateway)
    *   `ipns://pulseremit.eth` (Brave Browser / Opera / Status)

## Notes on "Claim ENS" Feature on IPFS
Since your site is now a static IPFS deployment, it cannot run the backend API route for Namestone directly on IPFS.
*   We have updated the frontend to send requests to your Vercel URL (`https://pulse-remit.vercel.app/api/namestone`).
*   Ensure your Vercel deployment has the `NAMESTONE_API_KEY` set in its environment variables.
