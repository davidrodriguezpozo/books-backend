import db from './index';


export async function updateState(): Promise<void>{

  await db.all(`UPDATE reedsy_exports 
                 SET state = 'finished', updated_at = CURRENT_TIMESTAMP
               WHERE (job_type = 'epub' AND state = 'pending' AND  
                      (strftime('%s','now') - strftime('%s',updated_at)  > 10)) 
                  OR (job_type = 'pdf'  AND state = 'pending' AND  
                      (strftime('%s','now') - strftime('%s',updated_at)  > 25))`,
    [],
    (err, rows) => {
        if(err)
          console.warn(err.message);
    }
  );

  await db.all(`UPDATE reedsy_imports
                       SET state = 'finished', updated_at = CURRENT_TIMESTAMP
                     WHERE state = 'pending' 
                       AND (strftime('%s','now') - strftime('%s',updated_at)) > 60`,
    [],
    (err, rows) => {
    if(err)
      console.warn(err.message);
  });
}