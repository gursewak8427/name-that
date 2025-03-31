export default function GameInstructions() {
  return (
    <div className="min-h-[80%] p-6 bg-gray-100 rounded-lg shadow-md mt-4">
      <ul className="list-disc list-inside space-y-3 text-gray-800 text-2xl font-bold leading-[50px]">
        <li>
          <strong>Make sure your sound is turned ON.</strong> If you’re playing
          via videoconference, ensure you are sharing screen with sound.
        </li>
        <li>
          Give <strong>30-60 seconds</strong> per question before moving on to
          the next question. You may play the audio/video clip multiple times.
        </li>
        <li>
          Players/Teams can write their answers on a piece of paper. At the end
          of the round, exchange answer sheets with another player/team for
          scoring{" "}
          <span className="italic">(this is done to ensure fairness)</span>.
        </li>
        <li>
          The <strong>Host</strong> will make all final judgment calls and their
          decision will be final.
        </li>
        <li>
          <span className="font-semibold">(Optional)</span> Consider making the
          final round worth <span className="font-bold">2x points</span>!
        </li>
        <li className="font-bold">Have a great game!</li>
      </ul>
    </div>
  );
}
