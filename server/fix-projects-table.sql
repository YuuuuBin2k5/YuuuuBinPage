-- Fix projects table to add title column properly

-- Step 1: Check if title column exists
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'projects' AND column_name = 'title'
    ) THEN
        -- Add title column as nullable first
        ALTER TABLE projects ADD COLUMN title VARCHAR(255);
        RAISE NOTICE 'Added title column';
    END IF;
END $$;

-- Step 2: Update existing NULL or empty titles with default values
UPDATE projects 
SET title = COALESCE(description, 'Untitled Project ' || project_id)
WHERE title IS NULL OR title = '';

-- Step 3: Now make title NOT NULL
ALTER TABLE projects ALTER COLUMN title SET NOT NULL;

-- Verify the changes
SELECT project_id, title, description 
FROM projects 
ORDER BY project_id;
