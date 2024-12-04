// SPDX-License-Identifier: MIT
pragma solidity >=0.7;
contract Auction {
    struct auction{
        uint id;
        string imgUrl;
        string title;
        string desc;
        string endTime;
        uint bids;
        uint minPaybaleBid;
        uint256 increment;
        bool isEnded;
        address owner;
    }
    struct user{
        uint acId;
        address userAddress;
        uint256 bidAmount;
        string bidTime;
    }
    struct complete{
        auction ac;
        user myuser;
    }
    uint public  idCount=0;
    address owner;
    constructor() {
        owner=msg.sender;
    }
    auction[] public  auctions;
    user[] public  users;
    mapping (uint auction_id=>user[]) public map;
    function addAuction(string calldata _imgUrl,string calldata _title,string calldata _desc,string calldata _endTime,uint _bids,uint _minPaybaleBid,uint _increment) external {
        auctions.push(auction(idCount,_imgUrl,_title,_desc,_endTime,_bids,_minPaybaleBid,_increment,false,payable (msg.sender)));
        idCount++;
    }
    function listAuctions() public view returns(auction[] memory){
        auction[] memory auctionArray=new auction[](auctions.length);
        uint k=0;
        for (uint256 i = 0; i < auctions.length; i++) {
            if(auctions[i].isEnded==false){
                auctionArray[k]=auctions[i];
                k++;
            }
        }
        return auctionArray;
    }

    function getHighestPayableBid(uint _auctionId)public view   returns(address,uint){
        user[] memory userArray=users;
        // we have given an user array in 2nf form we have to find maximum bi
        uint256 highest=0;
        address u_add;
        uint id=0;
        for(uint i=0;i<userArray.length;i++){
            uint256 amount=userArray[i].bidAmount;
           if(amount>=highest){// comparing time function should be add after there
           if(u_add==userArray[i].userAddress){
            highest+=amount;
           }
           else{
            u_add=userArray[i].userAddress;
            highest=amount;
           }
           }
        }
        return  (u_add,highest);
    }

    function viewAuction(uint _id)public view returns(auction memory){
        return auctions[_id];
    }

    function placeBid(uint _auctionId,uint _bidAmount,string calldata _bidTime) external   {
        require(_bidAmount>auctions[_auctionId].increment,"Amount Less Than Increment");
        uint256 weiAmount=_bidAmount*1 ether;
        payable(auctions[_auctionId].owner).transfer(weiAmount);
        users.push(user(_auctionId,msg.sender,_bidAmount,_bidTime));
    }

    function endAuction(uint  _auctionId) external{
        require(msg.sender==auctions[_auctionId].owner,"Not Admin");
        // return the money to all remaining persons
        (address winAdd,uint totalAmount)=getHighestPayableBid(_auctionId);
        
        for (uint i = 0; i < users.length; i++) {
            if(users[i].userAddress!=winAdd){
                uint256 weiAmount=users[i].bidAmount*1 ether;
                payable(users[i].userAddress).transfer(weiAmount);
            }
        }
        // after giving all to except him
        payable(winAdd).transfer(totalAmount-auctions[_auctionId].minPaybaleBid);
        auctions[_auctionId].isEnded=true;
        // finally my auction is ended
    }
    }

     
  
