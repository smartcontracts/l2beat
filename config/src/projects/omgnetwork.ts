import { RISK, TECHNOLOGY } from './common'
import { Project } from './types'

export const omgnetwork: Project = {
  name: 'OMG Network',
  slug: 'omgnetwork',
  bridges: [
    {
      address: '0x3Eed23eA148D356a72CA695DBCe2fceb40a32ce0',
      sinceBlock: 9687270,
      tokens: ['ETH'],
    },
    {
      address: '0x070cB1270A4B2bA53c81CeF89d0FD584Ed4F430B',
      sinceBlock: 9687286,
      tokens: [
        'USDT',
        'OMG',
        'BAT',
        'WBTC',
        'DAI',
        'CAT',
        'renBTC',
        'GNO',
        'BUSD',
        'ELEC',
        'PAX',
        'SPANK',
        'LION',
        'ZRX',
        'MATIC',
        'TUSD',
        'BNT',
        'KICK',
        'LINK',
        'BAL',
        'CEL',
        'CRO',
        'LRC',
        'USDC',
        'AST',
        'PASS',
        'KNC',
      ],
    },
  ],
  associatedToken: 'OMG',
  details: {
    links: {
      websites: ['https://omg.network'],
      apps: [],
      documentation: ['https://docs.omg.network/'],
      explorers: ['https://blockexplorer.mainnet.v1.omg.network/'],
      repositories: ['https://github.com/omgnetwork/plasma-contracts'],
      socialMedia: [
        'https://twitter.com/omgnetworkhq',
        'https://discord.gg/m7NysJjKhm',
        'https://t.me/omgnetwork',
        'https://linkedin.com/company/omgnetwork/',
      ],
    },
    technologyName: 'Plasma',
    technologyDetails: 'More Viable Plasma',
    purpose: 'Payments',
    riskView: {
      stateValidation: RISK.STATE_FP,
      dataAvailability: RISK.DATA_EXTERNAL,
      upgradeability: RISK.UPGRADABLE_YES,
      operatorCensoring: RISK.CENSORING_WITHDRAW_L1,
      operatorDown: RISK.DOWN_ESCAPE_U,
    },
    technology: {
      category: {
        name: 'Plasma',
        references: [],
      },
      stateCorrectness: {
        ...TECHNOLOGY.FRAUD_PROOFS,
        isIncomplete: true,
      },
      dataAvailability: {
        name: 'Data is not stored on chain',
        description: '',
        references: [],
        risks: [],
        isIncomplete: true,
      },
      massExit: {
        name: 'The mass exit problem is unsolved',
        description:
          'In case the operator is malicious all users need to exit within a predetermined time frame. Users that do not manage to do this will lose their funds.',
        references: [],
        risks: [
          {
            category: 'Funds can be stolen if',
            text: 'users are unable to withdraw in a mass exit event.',
          },
        ],
        isIncomplete: true,
      },
      operator: {
        name: 'There is a single operator',
        description: '',
        references: [],
        risks: [],
        isIncomplete: true,
      },
      forceTransactions: {
        name: 'Users can avoid censorship by exiting',
        description:
          'There is no mechanism that allows users to force any transactions. If users find themselves censored they need to exit',
        references: [],
        risks: [],
        isIncomplete: true,
      },
      exitMechanisms: [
        {
          name: 'Regular exit',
          description:
            'Users need to send an L1 transaction and provide a merkle proof of funds to exit.',
          risks: [],
          references: [],
          isIncomplete: true,
        },
      ],
      contracts: {
        addresses: [
          {
            name: 'EthVault',
            address: '0x3Eed23eA148D356a72CA695DBCe2fceb40a32ce0',
          },
          {
            name: 'Erc20Vault',
            address: '0x070cB1270A4B2bA53c81CeF89d0FD584Ed4F430B',
          },
          {
            name: 'ETHDepositVerifier',
            // UNVERIFIED ON ETHERSCAN!
            address: '0x649f37203c365DE759c8fc8CA35beBF5448F70Be',
          },
          {
            name: 'ERC20DepositVerifier',
            // UNVERIFIED ON ETHERSCAN!
            address: '0xD876aeb3a443FBC03B7349AAc115E9054563CD82',
          },
        ],
        risks: [],
      },
    },
    parameters: [
      {
        name: 'Primary use case',
        value: 'Payments',
      },
      {
        name: 'Hypothetical level of decentralization',
        value: 'High',
        sentiment: 'good',
      },
      {
        name: 'Current level of decentralization',
        value: 'Low',
        tooltip: 'Single operator. Supports decentralized watchers.',
        sentiment: 'warning',
      },
      {
        name: 'Can funds be stolen by the operator?',
        value: 'No',
        tooltip:
          'Users can safely exit to L1 even if the operator is malicious.',
        sentiment: 'good',
      },
      {
        name: 'Permisonless?',
        value: 'No',
        sentiment: 'bad',
        tooltip: 'Only operator can produce new blocks',
      },
      {
        name: 'Force TX mechanism?',
        value: 'Yes but only for withdrawals',
        sentiment: 'good',
      },
      {
        name: 'Privacy',
        value: 'No',
      },
      {
        name: 'Smart contracts',
        value: 'No',
      },
    ],
    news: [
      {
        date: '2020-06-01',
        name: 'Scaling Ethereum with the OMG Network',
        link: 'https://omg.network/omg-network-scales-ethereum/',
      },
    ],
  },
}
