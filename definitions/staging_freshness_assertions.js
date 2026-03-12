const freshnessTargets = [
    {table: "stg_user", dateCol: "updated_at", delayHours: 24}, 
    {table: "stg_artist", dateCol: "updated_at", delayHours: 24}, 
    {table: "stg_album", dateCol: "updated_at", delayHours: 24}, 
    {table: "stg_track", dateCol: "updated_at", delayHours: 24}, 
    {table: "stg_track_artist", dateCol: "updated_at", delayHours: 24}, 
    {table: "stg_streaming_history", dateCol: "updated_at", delayHours: 24}
];

freshnessTargets.forEach(target => {
    assert(`assert_freshness_${target.table}`)
    .database("spotify-analysis-482506")
    .schema("dataform_assertions")
    .tags(["freshness_daily"])
    .query(ctx => `
        SELECT 
            MAX(${target.dateCol}) AS last_update
        FROM ${ctx.ref(target.table)}
        HAVING 
            DATETIME_DIFF(CURRENT_DATETIME("Asia/Ho_Chi_Minh"), last_update, HOUR) > ${target.delayHours}
    `);
})