import styled from "styled-components";
import { colors } from "../theme/theme";
import { Departure } from "../utils/types";
import { AlertIcon, VehicleIcon } from "./icons";

export function Field({ departure }: { departure: Departure }) {
    const displayInformation = () => {
        if (!departure.alert) {
            return
        }
        alert(departure.alert)
    };
  return (
    <FieldWrapper onClick={displayInformation}>
      <LineElement>
        <VehicleIcon name={departure.style.vehicleIcon.name} />
        <LineNumber
          $circle={departure.style.icon.type !== "BOX"}
          $backgroundColor={departure.style.color}
        >
          <LineText $color={departure.style.icon.textColor}>
            {departure.style.icon.text}
          </LineText>
        </LineNumber>
        {departure.alert && <AlertIcon />}
      </LineElement>
      <DestinationElement>
        <DestinationText>{departure.headsign}</DestinationText>
      </DestinationElement>
      <TimeElement>
        <TimeText $delayed={departure.isDelayed}>
          {departure.departureText}
        </TimeText>
      </TimeElement>
    </FieldWrapper>
  );
}

const FieldWrapper = styled.div`
  :last-of-type {
    margin-bottom: 0;
  }
  width: 100%;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: white;
  padding: 10px;
  display: grid;
  grid-template-columns: 250px calc(100% - 250px - 20% - 10px) 20%;
  grid-gap: 5px;
  margin-bottom: 20px;
  @media (prefers-color-scheme: dark) {
    background-color: ${colors.darkGray};
  }
`;

const FieldElement = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const LineElement = styled(FieldElement)`
  justify-content: flex-start;
  align-items: center;
  grid-column: 1;
`;

const DestinationElement = styled(FieldElement)`
  grid-column: 2;
  justify-content: center;
  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

const DestinationText = styled.h1`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
`;

const TimeElement = styled(FieldElement)`
  justify-content: flex-end;
  grid-column: 3;
`;

export const LineNumber = styled.div<{
  $circle?: boolean;
  $backgroundColor: string;
}>`
  margin: 0 5px;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #${({ $backgroundColor }) => $backgroundColor};
  border-radius: ${({ $circle }) => ($circle ? "300px" : "10px")};
  width: ${({ $circle }) => ($circle ? "60px" : "100px")};
`;

export const LineText = styled.h1<{ $color: string }>`
  font-weight: bold;
  color: #${({ $color }) => $color};
`;

const TimeText = styled.h1<{ $delayed?: boolean }>`
  color: ${({ $delayed }) => ($delayed ? colors.red : colors.lightGreen)};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
