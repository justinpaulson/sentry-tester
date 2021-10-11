const importer = aha.getImporter("aha-develop-justin.sentry-tester.sentryImporter");

importer.on({ action: "listCandidates" }, async ({ filters, nextPage }, {identifier, settings}) => {
  const token = await aha.auth('sentry', { useCachedRetry: true });
  return [];
});

//Optional
importer.on({ action: "listFilters" }, ({}, {identifier, settings}) => {
  return {
    filterName: {
      title: "Project",
      required: true,
      type: "select",
    },
  };
});

//Optional
importer.on({ action: "filterValues" }, async ({ filterName, filters }, {identifier, settings}) => {
  const token = await aha.auth('sentry', { useCachedRetry: true });

  const headers = {
      Authorization: "Bearer " + token.token
  }

  const response = await fetch("https://sentry.io/api/0/projects/", { headers });

  const response_json = await response.json();
  
  console.log(response_json);
  return response_json.map(project => {return {text: project.name, value: project.slug}});
});

//Optional
//importer.on({ action: "renderRecord" }, ({ record, onUnmounted }, { identifier, settings }) => {
//  onUnmounted(() => {
//    console.log("Un-mounting component for", record.identifier);
//  });
//
//  return `${record.identifier} ${record.name}`;
//});

//Optional
//importer.on({ action: "importRecord" }, async ({ importRecord, ahaRecord }, {identifier, settings}) => {
//  //Import record code goes here
//});
