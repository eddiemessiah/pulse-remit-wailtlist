
export enum AgentStatus {
    ACTIVE = 'ACTIVE',
    PAUSED = 'PAUSED',
    EXECUTING = 'EXECUTING',
    ERROR = 'ERROR'
}

export enum ChainType {
    BASE = 'Base',
    OPTIMISM = 'Optimism',
    ETHEREUM = 'Ethereum',
    POLYGON = 'Polygon'
}

export interface RemittanceAgent {
    id: string;
    name: string;
    recipientEns: string;
    amount: number;
    currency: string;
    frequency: 'once' | 'daily' | 'weekly' | 'monthly';
    sourceChain: ChainType;
    destChain: ChainType;
    status: AgentStatus;
    lastRun?: string;
    nextRun?: string;
    hedgingEnabled: boolean;
}

export interface TransactionRecord {
    id: string;
    agentId: string;
    recipient: string;
    amount: number;
    currency: string;
    timestamp: string;
    status: 'COMPLETED' | 'PENDING' | 'FAILED';
    hash: string;
    feesSaved: number;
}

export interface AIPlanningResponse {
    name?: string;
    amount: number;
    token?: string;
    recipient: string;
    frequency: 'one-time' | 'once' | 'daily' | 'weekly' | 'monthly';
    sourceChain: string;
    destChain: string;
    actionRequired?: string;
}
