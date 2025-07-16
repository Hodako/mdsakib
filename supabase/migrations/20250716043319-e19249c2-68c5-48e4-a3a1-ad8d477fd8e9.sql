-- Add cv_url column to contact_info table
ALTER TABLE public.contact_info 
ADD COLUMN cv_url TEXT;