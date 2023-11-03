import React, { useEffect } from "react";
import StatusContainer from "../../components/StatusContainer/StatusContainer";
import MessagesContainer from "../../components/MessagesContainer/MessagesContainer";
import { Flex, Heading } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

import useClients, { IClient } from "../../hooks/useClients";
import useServer from "../../hooks/useServer";

const Home = () => {
  const [selectedClient, setSelectedClient] = React.useState<IClient | null>(
    null
  );
  const { data: clients, isLoading: isLoadingClient } = useClients();
  const { data: server } = useServer();

  useEffect(() => {
    if (clients?.length && !selectedClient) {
      handleClientChange(clients[0]);
    }
  }, [clients, selectedClient]);

  const handleClientChange = (client: IClient) => {
    setSelectedClient(client);
  };

  return (
    <Flex
      direction={"column"}
      paddingInline={2}
      justifyItems={"center"}
      paddingBlock={5}
    >
      <Heading
        color={"red.400"}
        fontSize={"3xl"}
        textAlign={"center"}
        marginBottom={5}
      >
        OCPP Monitoring System
      </Heading>

      <Flex marginBottom={5}>
        {!isLoadingClient ? (
          selectedClient ? (
            <MessagesContainer
              titleLeftEnhancer={
                <ArrowLeftIcon
                  boxSize={3}
                  onClick={() => {
                    const idx = clients.findIndex(
                      (client) => client.id === selectedClient.id
                    );
                    if (idx > 0) {
                      handleClientChange(clients[idx - 1]);
                    }
                  }}
                />
              }
              title={`Client: ${selectedClient.id}`}
              titleRightEnhancer={
                <ArrowRightIcon
                  boxSize={3}
                  onClick={() => {
                    const idx = clients.findIndex(
                      (client) => client.id === selectedClient.id
                    );
                    if (idx < clients.length - 1) {
                      handleClientChange(clients[idx + 1]);
                    }
                  }}
                />
              }
              messages={selectedClient.messages}
            />
          ) : (
            <MessagesContainer title="No Clients Connected" />
          )
        ) : (
          <MessagesContainer
            title="Loading..."
            messages={[
              {
                message: "Loading...",
                modalContent: {
                  title: "Loading...",
                  details: "Loading...",
                },
              },
            ]}
          />
        )}

        <MessagesContainer title="Server" messages={server?.messages} />
      </Flex>
      <StatusContainer />
    </Flex>
  );
};

export default Home;
