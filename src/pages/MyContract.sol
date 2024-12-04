// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Auction {
    struct AuctionItem {
        uint id;
        string imgUrl;
        string title;
        string desc;
        string endTime;
        uint bids;
        uint minPayableBid;
        uint256 increment;
        bool isEnded;
        address payable owner;
    }

    struct User {
        uint auctionId;
        address userAddress;
        uint256 bidAmount;
        string bidTime;
    }

    uint public idCount = 0;
    address public contractOwner;
    AuctionItem[] public auctions;
    User[] public users;
    mapping(uint => User[]) public auctionBids; // Maps auction ID to its list of bids

    event AuctionCreated(uint indexed auctionId, address indexed owner);
    event BidPlaced(uint indexed auctionId, address indexed bidder, uint amount);
    event AuctionEnded(uint indexed auctionId, address indexed winner, uint winningAmount);

    constructor() {
        contractOwner = msg.sender;
    }

    function addAuction(
        string calldata _imgUrl,
        string calldata _title,
        string calldata _desc,
        string calldata _endTime,
        uint _bids,
        uint _minPayableBid,
        uint _increment
    ) external {
        auctions.push(AuctionItem(
            idCount,
            _imgUrl,
            _title,
            _desc,
            _endTime,
            _bids,
            _minPayableBid,
            _increment,
            false,
            payable(msg.sender)
        ));
        emit AuctionCreated(idCount, msg.sender);
        idCount++;
    }

    function listAuctions() public view returns (AuctionItem[] memory) {
        uint activeCount = 0;
        for (uint i = 0; i < auctions.length; i++) {
            if (!auctions[i].isEnded) {
                activeCount++;
            }
        }

        AuctionItem[] memory activeAuctions = new AuctionItem[](activeCount);
        uint index = 0;
        for (uint i = 0; i < auctions.length; i++) {
            if (!auctions[i].isEnded) {
                activeAuctions[index] = auctions[i];
                index++;
            }
        }
        return activeAuctions;
    }

    function viewAuction(uint _id) public view returns (AuctionItem memory) {
        require(_id < auctions.length, "Auction does not exist");
        return auctions[_id];
    }

    function placeBid(
        uint _auctionId,
        uint _bidAmount,
        string calldata _bidTime
    ) external payable {
        require(_auctionId < auctions.length, "Auction does not exist");
        AuctionItem storage auction = auctions[_auctionId];
        require(!auction.isEnded, "Auction has ended");
        require(msg.value == _bidAmount * 1 ether, "Incorrect Ether sent");
        require(_bidAmount >= auction.minPayableBid, "Bid below minimum payable amount");
        require(_bidAmount >= auction.increment, "Amount less than increment");

        // Add the user's bid
        users.push(User(_auctionId, msg.sender, _bidAmount, _bidTime));
        auctionBids[_auctionId].push(User(_auctionId, msg.sender, _bidAmount, _bidTime));
        emit BidPlaced(_auctionId, msg.sender, _bidAmount);
    }

    function getHighestPayableBid(uint _auctionId) public view returns (address, uint) {
        require(_auctionId < auctions.length, "Auction does not exist");
        User[] memory userArray = auctionBids[_auctionId];

        address winner = address(0);
        uint256 highestBid = 0;

        for (uint i = 0; i < userArray.length; i++) {
            if (userArray[i].bidAmount > highestBid) {
                highestBid = userArray[i].bidAmount;
                winner = userArray[i].userAddress;
            }
        }
        return (winner, highestBid);
    }

    function endAuction(uint _auctionId) external {
        require(_auctionId < auctions.length, "Auction does not exist");
        AuctionItem storage auction = auctions[_auctionId];
        require(msg.sender == auction.owner, "Only the owner can end the auction");
        require(!auction.isEnded, "Auction already ended");

        (address winner, uint winningAmount) = getHighestPayableBid(_auctionId);
        auction.isEnded = true;

        // Refund all non-winning bidders
        User[] memory bids = auctionBids[_auctionId];
        for (uint i = 0; i < bids.length; i++) {
            if (bids[i].userAddress != winner) {
                uint256 refundAmount = bids[i].bidAmount * 1 ether;
                payable(bids[i].userAddress).transfer(refundAmount);
            }
        }

        // Transfer the winning amount minus the minimum payable bid to the owner
        uint256 ownerAmount = (winningAmount - auction.minPayableBid) * 1 ether;
        if (ownerAmount > 0) {
            auction.owner.transfer(ownerAmount);
        }

        emit AuctionEnded(_auctionId, winner, winningAmount);
    }
}
