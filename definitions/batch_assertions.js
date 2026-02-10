const freshnessTargets = [
    {table: "dim_user", dateCol: "updated_at", delayHours: 24}, 
    {table: "dim_artist", dateCol: "updated_at", delayHours: 24}, 
    {table: "dim_album", dateCol: "updated_at", delayHours: 24}, 
    {table: "dim_track", dateCol: "updated_at", delayHours: 24}, 
    {table: "bridge_track_artist", dateCol: "updated_at", delayHours: 24}, 
    {table: "fact_streaming_history", dateCol: "updated_at", delayHours: 24}
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