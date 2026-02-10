# PulseRemit Deployment & Roadmap

## 1. Push to GitHub
Run the following commands to push your latest changes to the new repository:

```bash
git add .
git commit -m "feat: add waitlist page, dashboard fixes, and Namestone API route"
git branch -M main
git push -u origin main
```

## 2. Deploy Waitlist on Filecoin (via Fleek)
To host the decentralized waitlist on Filecoin/IPFS:

1.  **Sign Up/Login to Fleek**: Go to [fleek.co](https://fleek.co/).
2.  **Add New Site**: Click "Add New Site".
3.  **Connect GitHub**: Select your `pulse-remit-wailtlist` repository.
4.  **Configure Build**:
    *   Framework: **Next.js**
    *   Build Command: `npm run build` (Note: ensure `output: 'export'` is set in `next.config.js` for strict IPFS compatibility, or use Fleek's Next.js adapter).
    *   Publish Directory: `.next` or `out`.
5.  **Deploy**: Click "Deploy Site".
6.  **Domain Setup**:
    *   Once deployed, Fleek gives you an IPFS hash and a `.fleek.co` domain.
    *   To point `pulseremit.eth` to this IPFS hash, go to the ENS App (app.ens.domains), manage your name, and set the **Content Hash** record to `ipfs://<your-deployment-hash>`.

## 3. Namestone Integration (ENS Subnames)
To allow users to claim `name.pulseremit.eth`:

1.  **Get API Key**: Register at [Namestone.com](https://namestone.com/).
2.  **Configure DNS**: Set the `NS` record for `pulseremit.eth` (or your domain) to point to Namestone's nameservers as per their instructions.
3.  **Environment Variables**:
    *   Add `NAMESTONE_API_KEY` to your Vercel/Fleek environment variables.
    *   Update `src/app/api/namestone/route.ts` with your specific logic if needed.

## 4. Roadmap to 500 Users
1.  **Launch Waitlist**: Share the `pulseremit.eth` link (resolving to IPFS) on Twitter/Farcaster.
2.  **Incentivize**: "Free ENS subname for first 500 users" is a great hook.
3.  **Alpha Testing**: direct qualified users from the waitlist to `pulse-remit.vercel.app` for the actual dashboard.
