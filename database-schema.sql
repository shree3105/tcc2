-- Create submissions table for The Cardiology Clinic
CREATE TABLE IF NOT EXISTS submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at);

-- Add comments to the table
COMMENT ON TABLE submissions IS 'Self-referral form submissions for The Cardiology Clinic';
COMMENT ON COLUMN submissions.id IS 'Unique identifier for each submission';
COMMENT ON COLUMN submissions.name IS 'Patient name';
COMMENT ON COLUMN submissions.email IS 'Patient email address';
COMMENT ON COLUMN submissions.phone IS 'Patient phone number (optional)';
COMMENT ON COLUMN submissions.message IS 'Patient message/reason for referral';
COMMENT ON COLUMN submissions.created_at IS 'Timestamp when submission was created';
COMMENT ON COLUMN submissions.updated_at IS 'Timestamp when submission was last updated';
