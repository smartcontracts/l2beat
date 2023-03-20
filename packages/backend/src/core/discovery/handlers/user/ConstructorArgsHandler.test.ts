import { EthereumAddress, Hash256, mock } from '@l2beat/shared'
import { expect, mockFn } from 'earljs'
import { BigNumber, ethers, providers } from 'ethers'

import { DiscoveryLogger } from '../../DiscoveryLogger'
import { DiscoveryProvider } from '../../provider/DiscoveryProvider'
import {
  ConstructorArgsHandler,
  decodeConstructorArgs,
  serializeResult,
} from './ConstructorArgsHandler'

const sampleTxData =
  '0x6060604052341561000f57600080fd5b6040516109c63803806109c683398101604052808051820191906020018051820191906020018051919060200180519190602001805191506000905085805161005c9291602001906100ed565b5060018480516100709291602001906100ed565b506002805460ff191660ff8516179055600482905560008111156100e357600160a060020a03331660008181526005602052604080822084905560038490557fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9084905190815260200160405180910390a35b5050505050610188565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061012e57805160ff191683800117855561015b565b8280016001018555821561015b579182015b8281111561015b578251825591602001919060010190610140565b5061016792915061016b565b5090565b61018591905b808211156101675760008155600101610171565b90565b61082f806101976000396000f3006060604052600436106100ae5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166306fdde0381146100b3578063095ea7b31461013d57806318160ddd1461017357806323b872dd14610198578063313ce567146101c05780633289e004146101e957806370a08231146102515780637ed0f1c11461027057806395d89b4114610286578063a9059cbb14610299578063dd62ed3e146102bb575b600080fd5b34156100be57600080fd5b6100c66102e0565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156101025780820151838201526020016100ea565b50505050905090810190601f16801561012f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561014857600080fd5b61015f600160a060020a0360043516602435610388565b604051901515815260200160405180910390f35b341561017e57600080fd5b6101866103f5565b60405190815260200160405180910390f35b34156101a357600080fd5b61015f600160a060020a03600435811690602435166044356103fb565b34156101cb57600080fd5b6101d36104e4565b60405160ff909116815260200160405180910390f35b34156101f457600080fd5b61024f600480359060248035600160a060020a0316916044359160849060643590810190830135806020808202016040519081016040528093929190818152602001838360200280828437509496506104ed95505050505050565b005b341561025c57600080fd5b610186600160a060020a036004351661067f565b341561027b57600080fd5b61015f60043561069a565b341561029157600080fd5b6100c66106bc565b34156102a457600080fd5b61015f600160a060020a036004351660243561072f565b34156102c657600080fd5b610186600160a060020a03600435811690602435166107c6565b6102e86107f1565b60008054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561037e5780601f106103535761010080835404028352916020019161037e565b820191906000526020600020905b81548152906001019060200180831161036157829003601f168201915b5050505050905090565b600160a060020a03338116600081815260066020908152604080832094871680845294909152808220859055909291907f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259085905190815260200160405180910390a35060015b92915050565b60035490565b600160a060020a038084166000908152600660209081526040808320339094168352929052908120548290108061044a5750600160a060020a0384166000908152600560205260409020548290105b15610457575060006104dd565b600160a060020a0380851660008181526005602081815260408084208054899003905560068252808420338716855282528084208054899003905594881680845291905290839020805486019055917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9085905190815260200160405180910390a35060015b9392505050565b60025460ff1690565b61010084046000908152600760205260408120549060ff861660020a9080808385161561051957600080fd5b610100890460009081526007602052604090819020858717905589908990899051928352600160a060020a03919091166c01000000000000000000000000026020830152603482015260540160405180910390209250889150600090505b85518161ffff16101561060c5781600116600114156105c957858161ffff16815181106105a057fe5b9060200190602002015183604051918252602082015260409081019051809103902092506105fe565b82868261ffff16815181106105da57fe5b90602001906020020151604051918252602082015260409081019051809103902092505b600282049150600101610577565b600454831461061a57600080fd5b600160a060020a03881660008181526005602052604080822080548b019055600380548b0190557fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908a905190815260200160405180910390a3505050505050505050565b600160a060020a031660009081526005602052604090205490565b610100810460009081526007602052604090205460ff90911660020a16151590565b6106c46107f1565b60018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561037e5780601f106103535761010080835404028352916020019161037e565b600160a060020a03331660009081526005602052604081205482901015610758575060006103ef565b600160a060020a033381166000818152600560205260408082208054879003905592861680825290839020805486019055917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9085905190815260200160405180910390a350600192915050565b600160a060020a03918216600090815260066020908152604080832093909416825291909152205490565b602060405190810160405260008152905600a165627a7a7230582024bc33c3b6a7849beac05e6431c62a81a1c6ffa851a90da75f8e3b071b33c88b002900000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000012dc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011506920446179204e30306220546f6b656e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035049450000000000000000000000000000000000000000000000000000000000'
const sampleAbi = ['constructor(string,string,uint8,bytes32,uint256)']

describe(ConstructorArgsHandler.name, () => {
  describe(ConstructorArgsHandler.prototype.execute.name, () => {
    it('correctly extract constructor arguments', async () => {
      const handler = new ConstructorArgsHandler(
        'constructorArgs',
        sampleAbi,
        DiscoveryLogger.SILENT,
      )

      const contractAddress = EthereumAddress.random()
      const txHash = Hash256.random()
      const transaction = fakeEthersTransaction({ data: sampleTxData })

      const provider = mock<DiscoveryProvider>({
        getContractDeploymentTx:
          mockFn<DiscoveryProvider['getContractDeploymentTx']>().resolvesTo(
            txHash,
          ),
        getTransaction:
          mockFn<DiscoveryProvider['getTransaction']>().resolvesTo(transaction),
      })

      const response = await handler.execute(provider, contractAddress)

      // @todo fix any here once earl is updated
      expect(response as any).toEqual({
        field: 'constructorArgs',
        value: [
          'Pi Day N00b Token',
          'PIE',
          18,
          '0xdc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece7',
          '0',
        ],
      })
      expect(provider.getContractDeploymentTx).toHaveBeenCalledExactlyWith([
        [contractAddress],
      ])
      expect(provider.getTransaction).toHaveBeenCalledExactlyWith([[txHash]])
    })
  })
})

describe(decodeConstructorArgs.name, () => {
  it('decodes AirDropToken tx data', () => {
    const iface = new ethers.utils.Interface(sampleAbi)
    const ctor = iface.fragments[0]

    const decoded = decodeConstructorArgs(ctor, sampleTxData)

    expect(decoded).toBeAnObjectWith([
      'Pi Day N00b Token',
      'PIE',
      18,
      '0xdc03b7993bad736ad595eb9e3ba51877ac17ecc31d2355f8f270125b9427ece7',
      ethers.BigNumber.from(0),
    ])
  })

  it('decodes starkware committee tx data', () => {
    const txData =
      '0x60806040526001805460ff1916905534801561001a57600080fd5b506040516107f53803806107f58339818101604052604081101561003d57600080fd5b810190808051604051939291908464010000000082111561005d57600080fd5b90830190602082018581111561007257600080fd5b825186602082028301116401000000008211171561008f57600080fd5b82525081516020918201928201910280838360005b838110156100bc5781810151838201526020016100a4565b5050505091909101604052506020015191505080610121576040805162461bcd60e51b815260206004820152601660248201527f4e4f5f52455155495245445f5349474e41545552455300000000000000000000604482015290519081900360640190fd5b8151811115610177576040805162461bcd60e51b815260206004820152601c60248201527f544f4f5f4d414e595f52455155495245445f5349474e41545552455300000000604482015290519081900360640190fd5b60005b825181101561028a576003600084838151811061019357fe5b6020908102919091018101516001600160a01b031682528101919091526040016000205460ff161580156101ed575060006001600160a01b03168382815181106101d957fe5b60200260200101516001600160a01b031614155b61023e576040805162461bcd60e51b815260206004820152601c60248201527f4e4f4e5f554e495155455f434f4d4d49545445455f4d454d4245525300000000604482015290519081900360640190fd5b60016003600085848151811061025057fe5b6020908102919091018101516001600160a01b03168252810191909152604001600020805460ff191691151591909117905560010161017a565b50600255506105578061029e6000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c8063504f7f6f146100675780636a938567146100e0578063a230c52414610111578063ce757d2914610137578063d6354e1514610151578063eeb7286614610159575b600080fd5b6100de6004803603604081101561007d57600080fd5b8135919081019060408101602082013564010000000081111561009f57600080fd5b8201836020820111156100b157600080fd5b803590602001918460018302840111640100000000831117156100d357600080fd5b5090925090506101d6565b005b6100fd600480360360208110156100f657600080fd5b503561041f565b604080519115158252519081900360200190f35b6100fd6004803603602081101561012757600080fd5b50356001600160a01b0316610430565b61013f610445565b60408051918252519081900360200190f35b6100fd61044b565b610161610454565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561019b578181015183820152602001610183565b50505050905090810190601f1680156101c85780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60025460410281101561021a5760405162461bcd60e51b81526004018080602001828103825260218152602001806104dd6021913960400191505060405180910390fd5b60008060005b60025481101561040e57600061026d86868080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525088925061048b915050565b905060006102b487878080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250505060208801905061048b565b905060008787876040018181106102c757fe5b9050013560f81c60f81b60f81c9050604186019550600060018a83868660405160008152602001604052604051808581526020018460ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa158015610338573d6000803e3d6000fd5b505060408051601f1901516001600160a01b03811660009081526003602052919091205490925060ff16905061039f5760405162461bcd60e51b81526004018080602001828103825260248152602001806104fe6024913960400191505060405180910390fd5b856001600160a01b0316816001600160a01b0316116103fd576040805162461bcd60e51b81526020600482015260156024820152744e4f4e5f534f525445445f5349474e41545552455360581b604482015290519081900360640190fd5b945050600190920191506102209050565b5061041885610493565b5050505050565b600061042a826104c7565b92915050565b60036020526000908152604090205460ff1681565b60025481565b60015460ff1690565b60408051808201909152601a81527f537461726b576172655f436f6d6d69747465655f323032325f32000000000000602082015290565b016020015190565b6000818152602081905260409020805460ff191660019081179091555460ff166104c4576001805460ff1916811790555b50565b60009081526020819052604090205460ff169056fe494e56414c49445f415641494c4142494c4954595f50524f4f465f4c454e475448415641494c4142494c4954595f50524f5645525f4e4f545f494e5f434f4d4d4954544545a2646970667358221220be886fe183147489f2edd227c05cba8d30e086a17fcb8f4a69ffa62013b0890464736f6c634300060c0033000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000006000000000000000000000000696cc7615a50cf12d1d1b38bf18a5606e970829600000000000000000000000081165b6504520416487e5b4935865b4d3eeaa6e5000000000000000000000000a6d068de0da2dc1becab509b118cb88723f72b6a0000000000000000000000000cbb676d12745948f75af3a172cb7e4a4f8546e8000000000000000000000000b0d71ff040a941bb9ca8453044634eebce5a053d0000000000000000000000008f3310cc6951ac11f2b125fc8ac2dfa133a9498c'
    const abi = [
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'committeeMembers',
            type: 'address[]',
          },
          {
            internalType: 'uint256',
            name: 'numSignaturesRequired',
            type: 'uint256',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
    ]
    const iface = new ethers.utils.Interface(abi)
    const ctor = iface.fragments[0]

    const decoded = decodeConstructorArgs(ctor, txData)

    expect(decoded).toBeAnObjectWith([
      [
        '0x696cC7615A50CF12d1d1B38bF18A5606e9708296',
        '0x81165b6504520416487E5b4935865b4D3eeaa6e5',
        '0xA6d068DE0da2Dc1BeCaB509B118CB88723f72b6A',
        '0x0cbb676d12745948f75aF3A172cb7E4A4f8546e8',
        '0xB0d71Ff040A941bB9CA8453044634EebCE5A053D',
        '0x8f3310cc6951AC11F2B125fC8AC2dfA133A9498c',
      ],
      ethers.BigNumber.from(3),
    ])
  })
})

describe('serializeResult', () => {
  it('should serialize a result', () => {
    const results: ethers.utils.Result = [
      ['0x696cC7615A50CF12d1d1B38bF18A5606e9708296'],
      ethers.BigNumber.from(3),
    ]

    const serialized = serializeResult(results)

    expect(serialized as any).toEqual([
      ['0x696cC7615A50CF12d1d1B38bF18A5606e9708296'],
      '3',
    ]) // @todo type error in earl
  })
})

function fakeEthersTransaction(
  defaults: Partial<providers.TransactionResponse> = {},
): providers.TransactionResponse {
  return {
    chainId: 1,
    confirmations: 1,
    data: '0x',
    from: EthereumAddress.random().toString(),
    gasLimit: BigNumber.from(100000),
    hash: Hash256.random().toString(),
    nonce: 1,
    value: BigNumber.from(0),
    wait: () => {
      throw new Error('Not implemented')
    },
    ...defaults,
  }
}
