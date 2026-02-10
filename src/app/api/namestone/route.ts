
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { name, address } = await request.json();

        if (!name || !address) {
            return NextResponse.json({ error: 'Missing name or address' }, { status: 400 });
        }

        // Connect to Namestone API
        // Replace with your actual Namestone API Key and Domain
        const NAMESTONE_API_KEY = process.env.NAMESTONE_API_KEY;
        const DOMAIN = 'pulseremit.eth';

        if (!NAMESTONE_API_KEY) {
            console.warn('Namestone API Key not set');
            // For demo purposes, we simulate success if key is missing
            return NextResponse.json({ success: true, message: 'Simulated claim (API Key missing)' });
        }

        const response = await fetch('https://namestone.xyz/api/claim', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${NAMESTONE_API_KEY}`,
            },
            body: JSON.stringify({
                domain: DOMAIN,
                name: name,
                address: address,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: errorData.message || 'Namestone API error' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Namestone claim error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
