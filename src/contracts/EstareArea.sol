pragma solidity >=0.5.0 <0.8.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract EstateArea is ChainlinkClient {

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    uint public sqftArea;
    bytes32 public latestRequestId;
    bytes32 public tokenHash;

    mapping(bytes32 => bytes32) public receiptArea;
    mapping(bytes32 => uint) public currentRealEstateArea;

    constructor() public {
        setPublicChainlinkToken();
        oracle = 0xAA1DC356dc4B18f30C347798FD5379F3D77ABC5b;
        jobId = "a8ea1913bdbc485dacdfa323647c80ed";
        fee = 0.1 * 10 ** 18; // 1 LINK
    }
    
    function returnSqftArea(string memory _tokenId) public {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.myCallback.selector);
        request.add("tokenId", _tokenId);
        request.add("copyPath", "sqftArea");
        receiptArea[sendChainlinkRequestTo(oracle, request, fee)] = stringToBytes32(_tokenId);
    }

    function myCallback(bytes32 _requestId, uint _sqftArea) public recordChainlinkFulfillment(_requestId){
        tokenHash = receiptArea[_requestId];
        delete receiptArea[_requestId];
        currentRealEstateArea[tokenHash] = _sqftArea;
        latestRequestId = _requestId;
        sqftArea = _sqftArea;
    }
    
    function getAreaTokenId(string memory _tokenId) public view returns (uint256) {
        return currentRealEstateArea[stringToBytes32(_tokenId)];
    }
    
    
    function stringToBytes32(string memory source) internal pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }

    function bytes32ToStr(bytes32 _bytes32) private pure returns (string memory) {
        bytes memory bytesArray = new bytes(32);
        for (uint256 i; i < 32; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }
}