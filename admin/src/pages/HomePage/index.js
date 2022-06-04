/*
 *
 * HomePage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import pluginId from '../../pluginId';
import axiosInstance from '../../utils/axiosInstance';

import { Alert } from '@strapi/design-system/Alert';
import { Button } from '@strapi/design-system/Button';
import { Dialog, DialogBody, DialogFooter } from '@strapi/design-system/Dialog';
import { Flex } from '@strapi/design-system/Flex';
import { BaseHeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Loader } from '@strapi/design-system/Loader';
import { Main } from '@strapi/design-system/Main';
import { Stack } from '@strapi/design-system/Stack';
import { Table, Thead, Tr, Th, Td, Tbody } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import ExclamationMarkCircle from "@strapi/icons/ExclamationMarkCircle";
import Upload from '@strapi/icons/Upload';

const HomePage = () => {
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [isConfirm, setConfirm] = useState(false);
  const [instance, setInstance] = useState(null)
  const [instances, setInstances] = useState([]);
  const { formatMessage } = useIntl();

  useEffect(() => {
    const fetchInstances = async () => {
      const response = await axiosInstance.get(`/${pluginId}`)
      setInstances(response.data.instances)
      setReady(true)
    };

    fetchInstances();
  }, []);

  const triggerPublish = async () => {
    setError(null)
    setConfirm(false)
    setBusy(true);

    await axiosInstance.post(`/${pluginId}/publish`, { id: instance })
      .catch((err) => setError(err.message))
      .finally(() => setBusy(false));
  };

  const handleClick = (id) => {
    setInstance(id)
    setConfirm(true)
  }

  return (
    <Main tabIndex={-1}>
      <BaseHeaderLayout
        title={formatMessage({ id: "cloudflare-pages.home.title" }) }
        subtitle={formatMessage({ id: "cloudflare-pages.home.description" })}
        as="h2" />
      <ContentLayout>
        {!ready ? (
          <Loader small>
            {formatMessage({ id: "cloudflare-pages.home.busy" })}
          </Loader>
        ) : (
          <>
            {error && <Alert title="Error" closeLabel="Close" onClose={() => setError(null)} variant="danger">{error}</Alert>}

            <Table colCount={2} rowCount={instances.length + 1}>
              <Thead>
                <Tr>
                  <Th>
                    <Typography variant="sigma" textColor="neutral600">
                      {formatMessage({ id: "cloudflare-pages.home.prompt" })}
                    </Typography>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {instances.map((instance) => (
                  <Tr key={instance.id}>
                    <Td>
                      <Typography textColor="neutral800">{instance.name}</Typography>
                    </Td>
                    <Td>
                      {busy ? (
                        <Loader small>
                          {formatMessage({ id: "cloudflare-pages.home.busy" })}
                        </Loader>
                      ) : (
                        <Button
                          variant="default"
                          startIcon={<Upload />}
                          onClick={() => handleClick(instance.id)}
                        >
                          {formatMessage({ id: "cloudflare-pages.home.button.publish" }, { instance: instance.name })}
                        </Button>
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </>
        )}
        <Dialog onClose={() => setConfirm(false)} title={formatMessage({ id: "cloudflare-pages.home.prompt.confirm.title" })} isOpen={isConfirm}>
          <DialogBody icon={<ExclamationMarkCircle />}>
            <Stack spacing={2}>
              <Flex justifyContent="center">
                <Typography id="confirm-description">{formatMessage({ id: "cloudflare-pages.home.prompt.confirm.description" })}</Typography>
              </Flex>
            </Stack>
          </DialogBody>
          <DialogFooter
            startAction={<Button onClick={() => setConfirm(false)} variant="tertiary">
                {formatMessage({ id: "cloudflare-pages.home.prompt.confirm.cancel" })}
              </Button>}
            endAction={<Button onClick={() => triggerPublish()} variant="danger-light" startIcon={<Upload />}>
              {formatMessage({ id: "cloudflare-pages.home.prompt.confirm.ok" })}
              </Button>}
            />
        </Dialog>
      </ContentLayout>
    </Main>
  );
};

export default memo(HomePage);
