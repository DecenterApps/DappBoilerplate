pragma solidity ^0.4.2;

contract SimpleStorage {
  uint storedData;

  function setSomethingTest(uint x) {
    storedData = x + 1;
  }

  function get() constant returns (uint) {
    return storedData;
  }
}
