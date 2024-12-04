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
    mapping (uint auction_id=>user[]) public map;
    function addAuction(string calldata _imgUrl,string calldata _title,string calldata _desc,string calldata _endTime,uint _bids,uint _minPaybaleBid,uint _increment) external {
        auctions.push(auction(idCount,_imgUrl,_title,_desc,_endTime,_bids,_minPaybaleBid,_increment,false,payable (msg.sender)));
        idCount++;
    }
    function listAuctions() public view returns(auction[] memory){
        
        return auctions;
    }

    function getHighestPayableBid(uint _auctionId)public view   returns(user memory){
        user[] memory userArray=map[_auctionId];
        uint256 highest=0;
        uint id=0;
        for(uint i=0;i<userArray.length;i++){
            uint256 amount=userArray[i].bidAmount;
           if(amount>=highest){// comparing time function should be add after there
            id=i;
            highest=amount;
           }
        }
        return  userArray[id];
    }

    function viewAuction(uint _id)public view returns(complete memory){
        auction memory m=auctions[_id];
        user memory highestUser=getHighestPayableBid(_id);
        complete memory comp=complete(m,highestUser);
        return comp ;
    }

    function placeBid(uint _auctionId,uint _bidAmount) external   {
        require(_bidAmount>auctions[_auctionId].increment,"Amount Less Than Increment");
        user[] memory userArray=map[_auctionId];
        uint256 weiAmount=_bidAmount*1 ether;
        bool isFound=false;
        for(uint i=0;i<userArray.length;i++){
            if(userArray[i].userAddress==msg.sender){
                payable(auctions[_auctionId].owner).transfer(_bidAmount);
                userArray[i].bidAmount+=weiAmount;// Incrementing the Bidding Ammount to Certain Value
                isFound=true;
                break;
            }  
        }
        if(isFound==false){
            // userArray.push(user(msg.sender,weiAmount));
            payable(auctions[_auctionId].owner).transfer(weiAmount);
        }  
    }

    function endAuction(uint  _auctionId) external{
        auctions[_auctionId].isEnded=true;
        uint256 minPayableAmount=auctions[_auctionId].minPaybaleBid;
        user[] memory userArray=map[_auctionId];
        user memory highestUser=getHighestPayableBid(_auctionId);
        for(uint i=0;i<userArray.length;i++){
             address payable userAdd = payable(userArray[i].userAddress); 
            uint amount=userArray[i].bidAmount;
        
            if(userAdd==highestUser.userAddress){
                if(amount-minPayableAmount>0){
               userAdd.transfer(amount);
                }
                else{

                userAdd.transfer(amount-minPayableAmount);
                }
               
            }
            else{
                // transferring the amount to all the person whose amount is not equal to that
               userAdd.transfer(amount);
fdfdfdf
            }
        

    }
    
    

    

    
    }

     
  
}