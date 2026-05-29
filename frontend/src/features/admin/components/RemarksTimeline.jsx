const RemarksTimeline = ({
  remarks,
}) => {

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">

      <h2 className="text-2xl font-bold text-[#0b2e59] mb-6">
        Remarks Timeline
      </h2>

      <div className="space-y-6">

        {
          remarks.map(
            (remark, index) => (

              <div
                key={index}
                className="border-l-4 border-[#0b2e59] pl-4"
              >

                <p className="font-semibold">
                  {remark.message}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  {
                    new Date(
                      remark.createdAt
                    ).toLocaleString()
                  }
                </p>

              </div>
            )
          )
        }

      </div>

    </div>
  );
};

export default RemarksTimeline;