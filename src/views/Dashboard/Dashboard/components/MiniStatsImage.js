import React from "react";

import {
    Flex,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
    useColorModeValue,
  } from "@chakra-ui/react";
  // Custom components
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import IconBox from "components/Icons/IconBox";
  import reckkk from  "../reckkk.json"
  import MiniStatistics from "./MiniStatistics"


const renderNftImg = ({ title, usdAmount, btcAmount, percentage, icon, nftimage }) => {
    return (
        <div>
        {
                reckkk && reckkk.map( reckkk => {
                  return(
                      <MiniStatistics 
                        key={ reckkk.id }
                        title={reckkk.title}
                        // nftimg = {"IMG_9442.GIF"}
                        usdAmount={reckkk.usdAmount}
                        percentage={55}
                        nftimage={reckkk.imageURL}
                        icon={<CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
                      />
                      
                  )
                })
              }
            </div>
              
    );

}

        

  export default renderNftImg;