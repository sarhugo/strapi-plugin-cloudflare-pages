/*
 *
 * HomePage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { Button, Padded, Text } from "@buffetjs/core";
import { Header } from "@buffetjs/custom";
import { LoadingBar } from "@buffetjs/styles";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext, request } from "strapi-helper-plugin";

import pluginId from '../../pluginId';

const HomePage = () => {
  const { formatMessage } = useGlobalContext();
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [instances, setInstances] = useState([]);

  useEffect(() => {
    const fetchInstances = async () => {
      const data = await request('/cloudflare-pages', {
        method: 'GET',
      })
      setInstances(data.instances)
      setReady(true)
    };

    fetchInstances();
  }, []);

  const triggerPublish = async (id) => {
    setBusy(true);

    await request('/cloudflare-pages/publish', { method: "POST", body: { id } });

    setBusy(false);
  };

  const handleClick = (id) => () => {
    const ok = confirm(
      formatMessage({ id: "cloudflare-pages.home.prompt.confirm" })
    );
    if (ok) triggerPublish(id);
  };

  return (
    <Padded size="md" top left bottom right>
      <Header
        title={{ label: formatMessage({ id: "cloudflare-pages.home.title" }) }}
        content={formatMessage({ id: "cloudflare-pages.home.description" })}
      />
      {ready ? (busy ? (
          <>
            <LoadingBar />
            <Text>{formatMessage({ id: "cloudflare-pages.home.busy" })}</Text>
          </>
        ) : (
          <>
            <Padded size="md" bottom>
              <Text>{formatMessage({ id: "cloudflare-pages.home.prompt" })}</Text>
            </Padded>

            {instances.map((instance) => (
              <Padded size="sm" bottom>
                <Button
                  color="primary"
                  icon={<FontAwesomeIcon icon={faUpload} />}
                  onClick={handleClick(instance.id)}
                >
                  {formatMessage({ id: "cloudflare-pages.home.button.publish" }, { instance: instance.name })}
                </Button>
              </Padded>)
            )}
          </>
        )) : (
          <>
            <LoadingBar />
          </>
        )}
    </Padded>
  );
};

export default memo(HomePage);
