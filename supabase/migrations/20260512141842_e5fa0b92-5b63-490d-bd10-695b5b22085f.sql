DROP POLICY "Anyone can submit a registration" ON public.registrations;

CREATE POLICY "Anyone can submit a valid registration"
  ON public.registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 120
    AND char_length(department) BETWEEN 1 AND 120
    AND char_length(year) BETWEEN 1 AND 20
    AND char_length(event) BETWEEN 1 AND 120
    AND char_length(phone) BETWEEN 5 AND 20
  );